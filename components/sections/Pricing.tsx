"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { APP_STORE_URL, PRICING } from "@/lib/constants";
import { format, type Dictionary } from "@/lib/i18n";

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface PricingProps {
  dict: Dictionary["pricing"];
}

export function Pricing({ dict }: PricingProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  const billedNote = isAnnual
    ? format(dict.pro.billedAnnual, {
        price: PRICING.annual.display,
        days: PRICING.freeTrialDays,
      })
    : format(dict.pro.billedMonthly, { days: PRICING.freeTrialDays });

  const proCta = format(dict.pro.cta, { days: PRICING.freeTrialDays });
  const saveBadge = format(dict.save, { n: PRICING.annual.savePercent });

  const toggleOptions: Array<{ key: "monthly" | "annual"; label: string }> = [
    { key: "monthly", label: dict.monthly },
    { key: "annual", label: dict.annual },
  ];

  return (
    <section id="pricing" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <RevealWrapper>
          <div className="text-center mb-14">
            <SectionLabel>{dict.sectionLabel}</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
              {dict.titlePrefix}{" "}
              <span className="gradient-brand-text">{dict.titleEmphasis}</span>
            </h2>
            <p className="text-text-secondary max-w-md mx-auto mb-8">
              {dict.tagline}
            </p>

            {/* Billing toggle */}
            <div
              className="inline-flex items-center gap-1 p-1 rounded-btn"
              style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {toggleOptions.map(({ key, label }) => {
                const active = (key === "annual") === isAnnual;
                return (
                  <button
                    key={key}
                    onClick={() => setIsAnnual(key === "annual")}
                    aria-pressed={active}
                    className="relative px-5 py-2 text-sm font-semibold rounded-[calc(0.625rem-2px)] transition-all duration-200"
                    style={
                      active
                        ? {
                            background:
                              "linear-gradient(135deg, #2D5AB3 0%, #4C81DD 30%, #5C8FE6 60%, #7AA5FA 100%)",
                            color: "white",
                          }
                        : { color: "#4A4A4A" }
                    }
                  >
                    {label}
                    {key === "annual" && (
                      <span
                        className="ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-pill"
                        style={
                          active
                            ? { background: "rgba(255,255,255,0.2)", color: "white" }
                            : { background: "rgba(48,209,88,0.15)", color: "#30D158" }
                        }
                      >
                        {saveBadge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </RevealWrapper>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* ── Free Card ── */}
          <RevealWrapper delay={60}>
            <div
              className="rounded-card p-8 flex flex-col h-full"
              style={{
                background: "#0f0f0f",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="mb-8">
                <span className="text-xs font-semibold tracking-widest uppercase text-text-muted">
                  {dict.free.tag}
                </span>
                <div className="mt-3 flex items-end gap-2">
                  <span className="text-5xl font-bold text-text-primary">$0</span>
                  <span className="text-text-muted mb-1.5">{dict.free.forever}</span>
                </div>
                <p className="text-sm text-text-muted mt-2">{dict.free.note}</p>
              </div>

              <ul className="flex flex-col gap-3 mb-10 flex-1">
                {dict.free.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <span className="text-text-muted">
                      <CheckIcon />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-btn text-sm font-semibold text-text-secondary transition-all duration-200 hover:text-text-primary hover:border-brand-blue/40"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <PricingAppleGlyph />
                {dict.free.cta}
              </a>
            </div>
          </RevealWrapper>

          {/* ── Pro Card ── */}
          <RevealWrapper delay={120}>
            {/* Gradient border wrapper */}
            <div
              className="rounded-[calc(1.25rem+1px)] p-px h-full"
              style={{
                background:
                  "linear-gradient(135deg, #2D5AB3 0%, #4C81DD 30%, #5C8FE6 60%, #7AA5FA 100%)",
                boxShadow: "0 0 60px 0 rgba(122,165,250,0.22)",
              }}
            >
              <div
                className="rounded-card p-8 flex flex-col h-full"
                style={{ background: "#0f0f0f" }}
              >
                <div className="mb-8">
                  <span
                    className="text-xs font-semibold tracking-widest uppercase gradient-brand-text"
                  >
                    {dict.pro.tag}
                  </span>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-5xl font-bold text-text-primary">
                      {isAnnual
                        ? PRICING.annual.monthlyEquivalent
                        : PRICING.monthly.display}
                    </span>
                    <span className="text-text-muted mb-1.5">{dict.pro.perMonth}</span>
                  </div>
                  <p className="text-sm text-text-muted mt-2">{billedNote}</p>
                </div>

                <ul className="flex flex-col gap-3 mb-10 flex-1">
                  {dict.pro.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <span className="text-brand-blue">
                        <CheckIcon />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-btn text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(135deg, #2D5AB3 0%, #4C81DD 30%, #5C8FE6 60%, #7AA5FA 100%)",
                  }}
                >
                  <PricingAppleGlyph />
                  {proCta}
                </a>
              </div>
            </div>
          </RevealWrapper>
        </div>

        {/* Fine print */}
        <RevealWrapper delay={200}>
          <p className="text-center text-xs text-text-muted mt-8">
            {dict.fineprint}
          </p>
        </RevealWrapper>
      </div>
    </section>
  );
}

function PricingAppleGlyph() {
  return (
    <svg width="14" height="15" viewBox="0 0 13 14" fill="none" aria-hidden="true">
      <path
        d="M9.97 7.41c-.02-1.95 1.59-2.89 1.66-2.93-.9-1.32-2.31-1.5-2.81-1.52-1.2-.12-2.34.7-2.95.7-.62 0-1.55-.69-2.55-.67-1.31.02-2.52.76-3.19 1.93-1.36 2.36-.35 5.85.98 7.77.65.94 1.43 2 2.43 1.96.97-.04 1.34-.63 2.52-.63 1.17 0 1.5.63 2.53.61 1.04-.02 1.7-.96 2.34-1.91.74-1.1 1.04-2.16 1.06-2.22-.02-.01-2.03-.78-2.05-3.09M8.07 1.69c.53-.65.9-1.55.79-2.44-.77.03-1.7.51-2.26 1.16-.49.57-.93 1.5-.81 2.37.86.07 1.74-.44 2.28-1.09"
        fill="currentColor"
      />
    </svg>
  );
}
