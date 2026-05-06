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
const isCurrent = (a) =>
  (!a.startDate || a.startDate <= today()) &&
  (!a.endDate || a.endDate >= today());

const pickIncluded = (included, type, id) =>
  included.find((x) => x.type === type && x.id === id);

async function findAppId(token) {
  const j = await asc(
    token,
    `/apps?filter[bundleId]=${encodeURIComponent(BUNDLE_ID)}&fields[apps]=bundleId,name`,
  );
  if (!j.data?.length) softFail(`no app found for bundleId ${BUNDLE_ID}`);
  return j.data[0].id;
}

async function findSubscriptions(token, appId) {
  const j = await asc(
    token,
    `/apps/${appId}/subscriptionGroups` +
      `?include=subscriptions` +
      `&fields[subscriptionGroups]=referenceName,subscriptions` +
      `&fields[subscriptions]=productId,subscriptionPeriod` +
      `&limit=200`,
  );
  const subs = (j.included ?? []).filter((x) => x.type === "subscriptions");
  const byProduct = (pid) => subs.find((s) => s.attributes?.productId === pid);
  const m = byProduct(PRODUCT_MONTHLY);
  const y = byProduct(PRODUCT_YEARLY);
  if (!m) softFail(`subscription not found: ${PRODUCT_MONTHLY}`);
  if (!y) softFail(`subscription not found: ${PRODUCT_YEARLY}`);
  return { monthlyId: m.id, yearlyId: y.id };
}

async function priceAndTrial(token, subId) {
  const j = await asc(
    token,
    `/subscriptions/${subId}` +
      `?include=prices,introductoryOffers,prices.subscriptionPricePoint,introductoryOffers.subscriptionPricePoint` +
      `&fields[subscriptions]=productId,subscriptionPeriod,prices,introductoryOffers` +
      `&fields[subscriptionPrices]=startDate,endDate,territory,subscriptionPricePoint` +
      `&fields[subscriptionIntroductoryOffers]=startDate,endDate,duration,offerMode,numberOfPeriods,territory,subscriptionPricePoint` +
      `&fields[subscriptionPricePoints]=customerPrice` +
      `&limit=200`,
  );
  const inc = j.included ?? [];

  // Active USD price.
  let usdPrice;
  try {
    usdPrice = inc
      .filter((x) => x.type === "subscriptionPrices")
      .filter((p) => p.relationships?.territory?.data?.id === TERRITORY)
      .filter((p) => isCurrent(p.attributes ?? {}))
      .map((p) => {
        const ppId = p.relationships?.subscriptionPricePoint?.data?.id;
        const pp = pickIncluded(inc, "subscriptionPricePoints", ppId);
        return pp ? Number(pp.attributes.customerPrice) : null;
      })
      .find((v) => Number.isFinite(v));
  } catch (err) {
    softFail(`unable to parse price for sub ${subId}`, err.message);
  }
  if (!Number.isFinite(usdPrice)) {
    softFail(`no current USD price for sub ${subId}`);
  }

  // Free-trial intro offer.
  let trialDays = 0;
  try {
    trialDays =
      inc
        .filter((x) => x.type === "subscriptionIntroductoryOffers")
        .filter((o) => o.relationships?.territory?.data?.id === TERRITORY)
        .filter((o) => isCurrent(o.attributes ?? {}))
        .filter((o) => o.attributes?.offerMode === "FREE_TRIAL")
        .map(
          (o) =>
            (DURATION_DAYS[o.attributes.duration] ?? 0) *
            (o.attributes.numberOfPeriods ?? 1),
        )
        .find((d) => d > 0) ?? 0;
  } catch {
    /* leave trialDays = 0; we'll use the other plan's value */
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
