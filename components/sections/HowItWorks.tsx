import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import type { Dictionary } from "@/lib/i18n";
import { withBase } from "@/lib/paths";

const stepIcons = [
  <svg key="0" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M17 10c0 3.866-3.134 7-7 7s-7-3.134-7-7 3.134-7 7-7 7 3.134 7 7Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  <svg key="1" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="4" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 15l-1 2M13 15l1 2M6 17h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 8.5l2.5 2-2.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  <svg key="2" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2v10M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 14v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
];

const stepImages = [
  {
    src: "/screenshots/empty-deck-dark.png",
    alt: "SlideFlow empty deck with chat prompt ready",
  },
  {
    src: "/screenshots/canvas-grid-dark.png",
    alt: "SlideFlow canvas grid showing AI-built slides on a calculus deck",
  },
  {
    src: "/screenshots/presenting-dark.png",
    alt: "SlideFlow presenting a slide fullscreen during playback",
  },
];

interface HowItWorksProps {
  dict: Dictionary["howItWorks"];
}

export function HowItWorks({ dict }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <RevealWrapper>
          <div className="text-center mb-20">
            <SectionLabel>{dict.sectionLabel}</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
              {dict.titlePrefix}{" "}
              <span className="gradient-brand-text">{dict.titleEmphasis}</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">{dict.tagline}</p>
          </div>
        </RevealWrapper>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {dict.steps.map((step, i) => (
            <RevealWrapper key={i} delay={i * 100}>
              <div className="relative flex flex-col gap-5">
                {/* Connector line (desktop only) */}
                {i < dict.steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden md:block absolute top-[22px] left-[calc(100%+12px)] w-[calc(100%-24px)] h-px"
                    style={{ borderTop: "1px dashed rgba(255,255,255,0.1)" }}
                  />
                )}

                {/* Step number */}
                <p className="font-mono text-xs font-semibold tracking-widest text-text-muted">
                  {String(i + 1).padStart(2, "0")}
                </p>

                {/* Icon badge */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #2D5AB3 0%, #4C81DD 30%, #5C8FE6 60%, #7AA5FA 100%)",
                  }}
                >
                  {stepIcons[i]}
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {step.body}
                  </p>
                </div>

                {/* Preview slot */}
                <div
                  className="mt-2 rounded-xl overflow-hidden"
                  style={{
                    aspectRatio: "16 / 10",
                    background: "#0f0f0f",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={withBase(stepImages[i].src)}
                    alt={stepImages[i].alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
