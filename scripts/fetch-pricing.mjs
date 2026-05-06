#!/usr/bin/env node
/**
 * Fetch live subscription pricing from App Store Connect and write
 * `lib/pricing.generated.json`. Designed to never fail the build:
 * any error (missing creds, API down, schema drift) -> warn + exit 0
 * so the deploy continues using the last-known-good committed JSON.
 *
 * Run via:
 *   ASC_KEY_ID=... ASC_ISSUER_ID=... ASC_PRIVATE_KEY="$(cat AuthKey_XXX.p8)" \
 *     node scripts/fetch-pricing.mjs
 */

import { writeFile, readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import jwt from "jsonwebtoken";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BUNDLE_ID = "com.stareraadaspace.slide-flow";
const PRODUCT_MONTHLY = "pro_monthly_v1";
const PRODUCT_YEARLY = "pro_yearly_v1";
const TERRITORY = "USA";
const OUT_PATH = resolve(__dirname, "../lib/pricing.generated.json");
const API = "https://api.appstoreconnect.apple.com/v1";

/** Apple's introductory-offer duration enum -> days. */
const DURATION_DAYS = {
  THREE_DAYS: 3,
  ONE_WEEK: 7,
  TWO_WEEKS: 14,
  ONE_MONTH: 30,
  TWO_MONTHS: 60,
  THREE_MONTHS: 90,
  SIX_MONTHS: 180,
  ONE_YEAR: 365,
};

function softFail(msg, err) {
  console.warn(`[fetch-pricing] ${msg}`, err ?? "");
  process.exit(0);
}

function makeToken() {
  const { ASC_KEY_ID, ASC_ISSUER_ID, ASC_PRIVATE_KEY } = process.env;
  if (!ASC_KEY_ID || !ASC_ISSUER_ID || !ASC_PRIVATE_KEY) {
    softFail("credentials not set, skipping fetch (using committed JSON / fallback)");
  }
  // GitHub secrets sometimes flatten newlines into literal `\n`.
  const pem = ASC_PRIVATE_KEY.replace(/\\n/g, "\n");
  try {
    return jwt.sign(
      { iss: ASC_ISSUER_ID, aud: "appstoreconnect-v1" },
      pem,
      {
        algorithm: "ES256",
        header: { alg: "ES256", kid: ASC_KEY_ID, typ: "JWT" },
        expiresIn: "19m", // Apple caps at 20 minutes
      },
    );
  } catch (err) {
    softFail("failed to sign JWT (check ASC_PRIVATE_KEY format)", err.message);
  }
}

async function asc(token, path) {
  let res;
  try {
    res = await fetch(`${API}${path}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
  } catch (err) {
    softFail(`network error on GET ${path}`, err.message);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    softFail(`GET ${path} -> ${res.status} ${res.statusText}\n${body}`);
  }
  return res.json();
}

const today = () => new Date().toISOString().slice(0, 10);

async function findAppId(token) {
  const j = await asc(
    token,
    `/apps?filter[bundleId]=${encodeURIComponent(BUNDLE_ID)}&fields[apps]=bundleId,name`,
  );
  if (!j.data?.length) softFail(`no app found for bundleId ${BUNDLE_ID}`);
  return j.data[0].id;
}

async function findSubscriptions(token, appId) {
  // 1. List all subscription groups for the app.
  const groupsResp = await asc(
    token,
    `/apps/${appId}/subscriptionGroups?fields[subscriptionGroups]=referenceName&limit=200`,
  );
  const groups = groupsResp.data ?? [];
  console.log(
    `[fetch-pricing] subscription groups (${groups.length}): ${
      groups.map((g) => `${g.attributes?.referenceName ?? "?"} (${g.id})`).join(", ") || "(none)"
    }`,
  );

  // 2. For each group, fetch all subscriptions explicitly (don't rely on
  //    `?include=subscriptions` sideload which can return partial lists).
  const allSubs = [];
  for (const group of groups) {
    const subsResp = await asc(
      token,
      `/subscriptionGroups/${group.id}/subscriptions?fields[subscriptions]=productId,subscriptionPeriod&limit=200`,
    );
    for (const s of subsResp.data ?? []) allSubs.push(s);
  }

  const inventory = allSubs
    .map((s) => `${s.attributes?.productId} [${s.attributes?.subscriptionPeriod ?? "?"}]`)
    .join(", ");
  console.log(`[fetch-pricing] subscriptions in ASC: ${inventory || "(none)"}`);

  const byProduct = (pid) => allSubs.find((s) => s.attributes?.productId === pid);
  const m = byProduct(PRODUCT_MONTHLY);
  const y = byProduct(PRODUCT_YEARLY);
  if (!m) softFail(`subscription not found: ${PRODUCT_MONTHLY} (available: ${inventory || "none"})`);
  if (!y) softFail(`subscription not found: ${PRODUCT_YEARLY} (available: ${inventory || "none"})`);
  return { monthlyId: m.id, yearlyId: y.id };
}

async function priceAndTrial(token, subId) {
  // ── Active USD price ──────────────────────────────────────────────
  // `/subscriptions/{id}/prices` supports `filter[territory]` and the
  // simple `include=subscriptionPricePoint` sideload (not the nested form).
  const pricesResp = await asc(
    token,
    `/subscriptions/${subId}/prices?include=subscriptionPricePoint&filter[territory]=${TERRITORY}`,
  );
  const prices = pricesResp.data ?? [];
  const included = pricesResp.included ?? [];

  if (prices.length === 0) {
    softFail(`no ${TERRITORY} prices found for sub ${subId}`);
  }

  const now = today();
  // subscriptionPrices has only `startDate` — pick the most recent one whose
  // start has already passed; that's the currently-active price.
  const activePrice = prices
    .filter((p) => !p.attributes?.startDate || p.attributes.startDate <= now)
    .sort((a, b) =>
      (b.attributes?.startDate ?? "").localeCompare(a.attributes?.startDate ?? ""),
    )[0];

  if (!activePrice) softFail(`no active ${TERRITORY} price for sub ${subId}`);

  const ppId = activePrice.relationships?.subscriptionPricePoint?.data?.id;
  const pp = included.find((x) => x.id === ppId);
  if (!pp) softFail(`price point ${ppId} not sideloaded for sub ${subId}`);

  const usdPrice = Number(pp.attributes?.customerPrice);
  if (!Number.isFinite(usdPrice)) {
    softFail(`invalid customerPrice for sub ${subId}: ${pp.attributes?.customerPrice}`);
  }

  // ── Free-trial intro offer ────────────────────────────────────────
  // `/subscriptions/{id}/introductoryOffers` doesn't filter by territory,
  // so we fetch all and filter in code.
  let trialDays = 0;
  try {
    const offersResp = await asc(token, `/subscriptions/${subId}/introductoryOffers`);
    const trial = (offersResp.data ?? []).find((o) => {
      if (o.relationships?.territory?.data?.id !== TERRITORY) return false;
      if (o.attributes?.offerMode !== "FREE_TRIAL") return false;
      const start = o.attributes?.startDate;
      const end = o.attributes?.endDate;
      if (start && start > now) return false;
      if (end && end < now) return false;
      return true;
    });
    if (trial) {
      const days = DURATION_DAYS[trial.attributes?.duration] ?? 0;
      const periods = trial.attributes?.numberOfPeriods ?? 1;
      trialDays = days * periods;
    }
  } catch (err) {
    console.warn(
      `[fetch-pricing] could not fetch intro offers for sub ${subId}: ${err?.message ?? err}`,
    );
  }

  return { price: usdPrice, trialDays };
}

const fmtUSD = (n) => `$${n.toFixed(2)}`;

async function main() {
  const token = makeToken();
  const appId = await findAppId(token);
  const { monthlyId, yearlyId } = await findSubscriptions(token, appId);

  const m = await priceAndTrial(token, monthlyId);
  const y = await priceAndTrial(token, yearlyId);

  const monthlyEquiv = y.price / 12;
  const savePercent = Math.round((1 - monthlyEquiv / m.price) * 100);
  const trialDays = Math.max(m.trialDays, y.trialDays) || 7;

  const payload = {
    fetchedAt: new Date().toISOString(),
    freeTrialDays: trialDays,
    monthly: {
      price: m.price,
      currency: "USD",
      display: fmtUSD(m.price),
    },
    annual: {
      price: y.price,
      currency: "USD",
      display: fmtUSD(y.price),
      monthlyEquivalent: fmtUSD(monthlyEquiv),
      savePercent,
    },
  };

  console.log(
    "[fetch-pricing] live values from ASC:",
    JSON.stringify(
      {
        freeTrialDays: payload.freeTrialDays,
        monthly: payload.monthly.display,
        annual: payload.annual.display,
        monthlyEquivalent: payload.annual.monthlyEquivalent,
        savePercent: payload.annual.savePercent,
      },
      null,
      2,
    ),
  );

  // Stable diff: only rewrite when something actually changed.
  let prev = null;
  try {
    prev = JSON.parse(await readFile(OUT_PATH, "utf8"));
  } catch {
    /* file may not exist on first run */
  }
  const same =
    prev &&
    prev.freeTrialDays === payload.freeTrialDays &&
    prev.monthly?.price === payload.monthly.price &&
    prev.annual?.price === payload.annual.price;

  if (same) {
    console.log(
      "[fetch-pricing] committed JSON already matches ASC — no rewrite needed",
    );
    return;
  }

  await writeFile(OUT_PATH, JSON.stringify(payload, null, 2) + "\n");
  console.log(
    `[fetch-pricing] rewrote ${OUT_PATH} (committed JSON had: monthly=$${prev?.monthly?.price}, annual=$${prev?.annual?.price}, trial=${prev?.freeTrialDays}d)`,
  );
}

main().catch((e) => softFail("unexpected error", e?.stack ?? e));
