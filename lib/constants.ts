/**
 * Single source of truth for site-wide constants.
 *
 * Pricing notes:
 *   App Store Connect is the authoritative price for users — these values
 *   exist for the marketing site copy only. When you change a product's
 *   price in App Store Connect, update this file and redeploy.
 *
 *   We do NOT fetch live prices from Apple at build- or runtime:
 *   - The App Store Connect API requires JWT auth and a private key,
 *     which can't run client-side and is overkill for build-time.
 *   - StoreKit product info is meant to be read by the app itself, not
 *     a public website.
 *   - Prices change rarely; a one-line edit + redeploy is the right cost.
 */

export const APP_STORE_ID = "6764466935";
export const APP_STORE_URL = `https://apps.apple.com/app/id${APP_STORE_ID}`;

export const SUPPORT_URL =
  "https://github.com/Anderson-Hyl/slideflow-support/discussions";

export const PRICING = {
  freeTrialDays: 7,
  monthly: {
    price: 9.99,
    currency: "USD",
    display: "$9.99",
  },
  annual: {
    price: 79.99,
    currency: "USD",
    display: "$79.99",
    monthlyEquivalent: "$6.67",
    savePercent: 33,
  },
} as const;

/** Last revision date for the legal pages — update when you edit the copy. */
export const LEGAL_LAST_UPDATED = "May 6, 2026";
