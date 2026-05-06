import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { HeroScreenshot } from "@/components/ui/HeroScreenshot";
import type { Dictionary } from "@/lib/i18n";
import { withBase } from "@/lib/paths";

interface ShowcaseProps {
  dict: Dictionary["showcase"];
}

export function Showcase({ dict }: ShowcaseProps) {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <RevealWrapper>
          <div className="text-center mb-16">
            <SectionLabel>{dict.sectionLabel}</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
              {dict.titlePrefix}{" "}
              <span className="gradient-brand-text">{dict.titleEmphasis}</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">{dict.tagline}</p>
          </div>
        </RevealWrapper>

        {/* ── Command Palette callout ────────────────────────── */}
        <RevealWrapper delay={80}>
          <div
            className="rounded-card p-6 md:p-10 mb-6"
            style={{
              background: "#0f0f0f",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5">
                <span
                  className="inline-block text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md mb-4"
                  style={{
                    background: "rgba(122,165,250,0.1)",
                    color: "#7AA5FA",
                    border: "1px solid rgba(122,165,250,0.18)",
                  }}
                >
                  {dict.commandPalette.eyebrow}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight">
                  {dict.commandPalette.titlePrefix}{" "}
                  <span className="gradient-brand-text">{dict.commandPalette.titleEmphasis}</span>
                </h3>
                <p className="text-text-secondary leading-relaxed mb-5">
                  {dict.commandPalette.body}
                </p>
                <div className="flex flex-wrap gap-2">
                  {dict.commandPalette.shortcuts.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span className="text-text-secondary">{s.label}</span>
                      <kbd
                        className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          color: "#7AA5FA",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {s.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-7">
                <HeroScreenshot
                  srcDark="/screenshots/command-palette-dark.png"
                  srcLight="/screenshots/command-palette-light.png"
                  alt="SlideFlow command palette overlay"
                />
              </div>
            </div>
          </div>
        </RevealWrapper>

        {/* ── Bring Your Own Keys ────────────────────────────── */}
        <RevealWrapper delay={120}>
          <div
            className="rounded-card p-6 md:p-10 mb-6"
            style={{
              background: "#0f0f0f",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 order-2 md:order-1">
                <HeroScreenshot
                  srcDark="/screenshots/llm-provider-dark.png"
                  srcLight="/screenshots/llm-providers-light.png"
                  alt="SlideFlow LLM provider settings panel with API keys"
                />
              </div>
              <div className="md:col-span-5 order-1 md:order-2">
                <span
                  className="inline-block text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md mb-4"
                  style={{
                    background: "rgba(48,209,88,0.1)",
                    color: "#34C759",
                    border: "1px solid rgba(48,209,88,0.18)",
                  }}
                >
                  {dict.byok.eyebrow}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight">
                  {dict.byok.titlePrefix}{" "}
                  <span className="gradient-brand-text">{dict.byok.titleEmphasis}</span>
                </h3>
                <p className="text-text-secondary leading-relaxed mb-5">
                  {dict.byok.body}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {dict.byok.bullets.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="shrink-0 mt-0.5 text-brand-blue"
                      >
                        <path
                          d="M2.5 7l3 3 6-6"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </RevealWrapper>

        {/* ── Light + Dark theme paired ──────────────────────── */}
        <RevealWrapper delay={140}>
          <div
            className="rounded-card p-6 md:p-10"
            style={{
              background: "#0f0f0f",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            <div className="text-center mb-8">
              <span
                className="inline-block text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md mb-4"
                style={{
                  background: "rgba(165,153,255,0.1)",
                  color: "#A599FF",
                  border: "1px solid rgba(165,153,255,0.18)",
                }}
              >
                {dict.lightDark.eyebrow}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-3 leading-tight">
                {dict.lightDark.titlePrefix}{" "}
                <span className="gradient-brand-text">{dict.lightDark.titleEmphasis}</span>
              </h3>
              <p className="text-text-secondary max-w-xl mx-auto">
                {dict.lightDark.body}
              </p>
            </div>

            {/* Side-by-side paired screenshots */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PairedScreenshot
                src="/screenshots/welcome-dark.png"
                alt="SlideFlow welcome screen, dark theme"
                label={dict.lightDark.darkLabel}
                accent="#7AA5FA"
              />
              <PairedScreenshot
                src="/screenshots/welcome-light.png"
                alt="SlideFlow welcome screen, light theme"
                label={dict.lightDark.lightLabel}
                accent="#A599FF"
              />
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

function PairedScreenshot({
  src,
  alt,
  label,
  accent,
}: {
  src: string;
  alt: string;
  label: string;
  accent: string;
}) {
  return (
    <div className="relative">
      <div
        className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide"
        style={{
          background: "rgba(15,15,15,0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          color: accent,
          border: `1px solid ${accent}33`,
        }}
      >
        {label}
      </div>
      <div
        className="rounded-xl overflow-hidden"
        style={{
          aspectRatio: "1366 / 1024",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 16px 48px rgba(0,0,0,0.6)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBase(src)}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}
