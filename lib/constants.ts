/**
 * Single source of truth for site-wide constants.
 *
 * Pricing is fetched live from App Store Connect by `scripts/fetch-pricing.mjs`
 * and committed as `lib/pricing.generated.json`. The fallback below is what
 * gets used if the JSON is missing/malformed for any reason — it should match
 * the most recent known-good values so a fresh checkout still renders sensible
 * copy.
 */
import generated from "./pricing.generated.json";

export const APP_STORE_ID = "6764466935";
export const APP_STORE_URL = `https://apps.apple.com/app/id${APP_STORE_ID}`;

export const SUPPORT_URL =
  "https://github.com/Anderson-Hyl/slideflow-support/discussions";

interface PricingShape {
  freeTrialDays: number;
  monthly: { price: number; currency: string; display: string };
  annual: {
    price: number;
    currency: string;
    display: string;
    monthlyEquivalent: string;
    savePercent: number;
  };
}

const FALLBACK: PricingShape = {
  freeTrialDays: 7,
  monthly: { price: 9.99, currency: "USD", display: "$9.99" },
  annual: {
    price: 79.99,
    currency: "USD",
    display: "$79.99",
    monthlyEquivalent: "$6.67",
    savePercent: 33,
  },
};

const liveCandidate = generated as Partial<PricingShape> | null;

export const PRICING: PricingShape =
  liveCandidate &&
  liveCandidate.monthly?.price &&
  liveCandidate.annual?.price &&
  liveCandidate.freeTrialDays
    ? (liveCandidate as PricingShape)
    : FALLBACK;

/** Last revision date for the legal pages — update when you edit the copy. */
export const LEGAL_LAST_UPDATED = "May 6, 2026";
