import { Badge } from "@/components/ui/Badge";
import { GradientOrb } from "@/components/ui/GradientOrb";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { HeroScreenshot } from "@/components/ui/HeroScreenshot";
import { APP_STORE_URL, PRICING } from "@/lib/constants";
import { format, type Dictionary } from "@/lib/i18n";

interface HeroProps {
  dict: Dictionary["hero"];
}

export function Hero({ dict }: HeroProps) {
  const fineprint = format(dict.fineprint, {
    price: PRICING.annual.monthlyEquivalent,
    days: PRICING.freeTrialDays,
  });

  return (
    <section className="relative pt-40 pb-24 px-6 overflow-hidden">
      {/* Background orbs */}
      <GradientOrb
        color="blue"
        size={700}
        className="-top-40 left-1/2 -translate-x-1/2"
      />
      <GradientOrb
        color="purple"
        size={500}
        className="top-1/3 -right-48"
        driftOffset={-9}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Eyebrow badge */}
        <RevealWrapper delay={0}>
          <div className="flex justify-center mb-8">
            <Badge variant="brand">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #4C81DD 0%, #7AA5FA 100%)",
                }}
              />
              {dict.eyebrow}
            </Badge>
          </div>
        </RevealWrapper>

        {/* Main headline */}
        <RevealWrapper delay={80}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold leading-[1.05] tracking-tight mb-6">
            {dict.headlineLine1}
            <br />
            <span className="gradient-brand-text">{dict.headlineEmphasis}</span>
            <br />
            {dict.headlineLine3}
          </h1>
        </RevealWrapper>

        {/* Subheadline */}
        <RevealWrapper delay={160}>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            {dict.subhead}
          </p>
        </RevealWrapper>

        {/* CTA row */}
        <RevealWrapper delay={240}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-btn text-base font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(135deg, #2D5AB3 0%, #4C81DD 30%, #5C8FE6 60%, #7AA5FA 100%)",
                boxShadow: "0 0 32px rgba(122,165,250,0.35)",
              }}
            >
              <AppleGlyph />
              {dict.ctaPrimary}
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-btn text-base font-semibold text-text-secondary hover:text-text-primary transition-all duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {dict.ctaSecondary}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 3.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <p className="text-xs text-text-muted text-center mb-20">
            {fineprint}
          </p>
        </RevealWrapper>

        {/* Hero Screenshot */}
        <RevealWrapper delay={340} className="w-full">
          <HeroScreenshot
            srcDark="/screenshots/canvaspopulated-dark.png"
            srcLight="/screenshots/canvaspopulated-light.png"
            alt="SlideFlow app showing a populated deck on the live canvas with AI suggestions and chat"
          />
        </RevealWrapper>
      </div>
    </section>
  );
}

function AppleGlyph() {
  return (
    <svg width="16" height="17" viewBox="0 0 13 14" fill="none" aria-hidden="true">
      <path
        d="M9.97 7.41c-.02-1.95 1.59-2.89 1.66-2.93-.9-1.32-2.31-1.5-2.81-1.52-1.2-.12-2.34.7-2.95.7-.62 0-1.55-.69-2.55-.67-1.31.02-2.52.76-3.19 1.93-1.36 2.36-.35 5.85.98 7.77.65.94 1.43 2 2.43 1.96.97-.04 1.34-.63 2.52-.63 1.17 0 1.5.63 2.53.61 1.04-.02 1.7-.96 2.34-1.91.74-1.1 1.04-2.16 1.06-2.22-.02-.01-2.03-.78-2.05-3.09M8.07 1.69c.53-.65.9-1.55.79-2.44-.77.03-1.7.51-2.26 1.16-.49.57-.93 1.5-.81 2.37.86.07 1.74-.44 2.28-1.09"
        fill="currentColor"
      />
    </svg>
  );
}
