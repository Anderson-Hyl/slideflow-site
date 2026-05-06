import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import type { Dictionary } from "@/lib/i18n";

const providers = [
  { name: "Anthropic",          dot: "#E8956D" },
  { name: "Google Gemini",      dot: "#4285F4" },
  { name: "Groq",               dot: "#F55036" },
  { name: "OpenAI",             dot: "#10A37F" },
  { name: "Apple Intelligence", dot: "#34C759", isOnDevice: true },
];

const codeLines = [
  { indent: 0,  tokens: [{ t: "const",  c: "#A599FF" }, { t: " deck",   c: "#F0F0F0" }, { t: " =",    c: "#F0F0F0" }, { t: " await", c: "#7AA5FA" }, { t: " sf",   c: "#F0F0F0" }] },
  { indent: 1,  tokens: [{ t: ".createDeck(", c: "#7AA5FA" }, { t: "{", c: "#F0F0F0" }] },
  { indent: 2,  tokens: [{ t: "title:",  c: "#A599FF" }, { t: ' "Q3 Review"', c: "#30D158" }] },
  { indent: 2,  tokens: [{ t: "model:",  c: "#A599FF" }, { t: ' "claude"',    c: "#30D158" }] },
  { indent: 2,  tokens: [{ t: "slides:", c: "#A599FF" }, { t: " 12",          c: "#FF9F0A" }] },
  { indent: 1,  tokens: [{ t: "});", c: "#F0F0F0" }] },
];

const exportFormats = [
  { name: "Reveal.js", icon: "🌐", color: "rgba(122,165,250,0.12)", border: "rgba(122,165,250,0.22)" },
  { name: "MP4",       icon: "🎬", color: "rgba(165,153,255,0.12)", border: "rgba(165,153,255,0.22)" },
  { name: "PDF",       icon: "📄", color: "rgba(48,209,88,0.08)",   border: "rgba(48,209,88,0.15)"   },
  { name: "PNG",       icon: "🖼️", color: "rgba(255,159,10,0.08)",  border: "rgba(255,159,10,0.15)"  },
];

interface FeaturesProps {
  dict: Dictionary["features"];
}

export function Features({ dict }: FeaturesProps) {
  return (
    <section id="features" className="py-28 px-6">
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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* ── Live Canvas (large) ── */}
          <RevealWrapper delay={0} className="md:col-span-7">
            <FeatureCard className="h-full">
              <div className="mb-4">
                <EyebrowChip>{dict.liveCanvas.eyebrow}</EyebrowChip>
                <h3 className="text-xl font-semibold text-text-primary mt-3 mb-2">
                  {dict.liveCanvas.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {dict.liveCanvas.body}
                </p>
              </div>
              {/* Inspector screenshot */}
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  aspectRatio: "16/10",
                  background: "#060606",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/screenshots/inspector-dark.png"
                  alt="SlideFlow inspector panel editing slide properties live"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </FeatureCard>
          </RevealWrapper>

          {/* ── AI Providers (small) ── */}
          <RevealWrapper delay={60} className="md:col-span-5">
            <FeatureCard className="h-full flex flex-col">
              <EyebrowChip>{dict.aiProviders.eyebrow}</EyebrowChip>
              <h3 className="text-xl font-semibold text-text-primary mt-3 mb-2">
                {dict.aiProviders.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">
                {dict.aiProviders.body}
              </p>
              <div className="flex flex-col gap-1.5">
                {providers.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between px-3.5 py-2 rounded-lg"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: p.dot }}
                      />
                      <span className="text-sm text-text-primary">{p.name}</span>
                    </div>
                    {p.isOnDevice && (
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-pill"
                        style={{
                          background: "rgba(52,199,89,0.12)",
                          color: "#34C759",
                          border: "1px solid rgba(52,199,89,0.2)",
                        }}
                      >
                        {dict.aiProviders.onDevice}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </FeatureCard>
          </RevealWrapper>

          {/* ── MCP Integration (small) ── */}
          <RevealWrapper delay={120} className="md:col-span-5">
            <FeatureCard className="h-full flex flex-col">
              <EyebrowChip>{dict.mcp.eyebrow}</EyebrowChip>
              <h3 className="text-xl font-semibold text-text-primary mt-3 mb-2">
                {dict.mcp.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                {dict.mcp.body}
              </p>
              <div
                className="font-mono text-xs leading-6 rounded-xl p-4 mt-auto"
                style={{
                  background: "#0c1117",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {codeLines.map((line, i) => (
                  <div key={i} style={{ paddingLeft: `${line.indent * 14}px` }}>
                    {line.tokens.map((tok, j) => (
                      <span key={j} style={{ color: tok.c }}>
                        {tok.t}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </FeatureCard>
          </RevealWrapper>

          {/* ── Rich Export (large) ── */}
          <RevealWrapper delay={180} className="md:col-span-7">
            <FeatureCard className="h-full flex flex-col">
              <div className="mb-6">
                <EyebrowChip>{dict.richExport.eyebrow}</EyebrowChip>
                <h3 className="text-xl font-semibold text-text-primary mt-3 mb-2">
                  {dict.richExport.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {dict.richExport.body}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-auto">
                {exportFormats.map((fmt) => (
                  <div
                    key={fmt.name}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
                    style={{ background: fmt.color, border: `1px solid ${fmt.border}` }}
                  >
                    <span className="text-xl" role="img" aria-hidden>
                      {fmt.icon}
                    </span>
                    <span className="font-semibold text-sm text-text-primary">
                      {fmt.name}
                    </span>
                  </div>
                ))}
              </div>
            </FeatureCard>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-card p-6 ${className}`}
      style={{
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      {children}
    </div>
  );
}

function EyebrowChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md"
      style={{
        background: "rgba(122,165,250,0.1)",
        color: "#7AA5FA",
        border: "1px solid rgba(122,165,250,0.18)",
      }}
    >
      {children}
    </span>
  );
}
