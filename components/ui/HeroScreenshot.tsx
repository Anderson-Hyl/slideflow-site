"use client";

import { useState } from "react";
import { withBase } from "@/lib/paths";

type Theme = "dark" | "light";

interface HeroScreenshotProps {
  srcDark: string;
  srcLight: string;
  alt: string;
  showToggle?: boolean;
  defaultTheme?: Theme;
  /** Aspect ratio (width / height). Default matches the iPad screenshots. */
  aspectRatio?: string;
}

export function HeroScreenshot({
  srcDark,
  srcLight,
  alt,
  showToggle = true,
  defaultTheme = "dark",
  aspectRatio = "1366 / 1024",
}: HeroScreenshotProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  return (
    <div className="relative w-full">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 55%, rgba(122,165,250,0.20) 0%, rgba(76,129,221,0.08) 50%, transparent 80%)",
          filter: "blur(40px)",
          transform: "scale(1.15)",
        }}
      />

      {/* Theme toggle */}
      {showToggle && (
        <div
          className="absolute top-4 right-4 z-20 flex items-center gap-1 p-1 rounded-pill"
          style={{
            background: "rgba(15, 15, 15, 0.7)",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          {(["dark", "light"] as const).map((t) => {
            const active = theme === t;
            return (
              <button
                key={t}
                onClick={() => setTheme(t)}
                aria-pressed={active}
                className="relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                style={
                  active
                    ? {
                        background:
                          "linear-gradient(135deg, #2D5AB3 0%, #4C81DD 30%, #5C8FE6 60%, #7AA5FA 100%)",
                        color: "white",
                      }
                    : { color: "rgba(255,255,255,0.4)" }
                }
                aria-label={`${t} theme`}
                title={`${t.charAt(0).toUpperCase()}${t.slice(1)} mode`}
              >
                {t === "dark" ? <MoonIcon /> : <SunIcon />}
              </button>
            );
          })}
        </div>
      )}

      {/* Image frame */}
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{
          aspectRatio,
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.07), 0 40px 100px rgba(0,0,0,0.9)",
        }}
      >
        {([
          { t: "dark" as const, src: srcDark },
          { t: "light" as const, src: srcLight },
        ]).map(({ t, src }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={t}
            src={withBase(src)}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: theme === t ? 1 : 0 }}
            loading={t === defaultTheme ? "eager" : "lazy"}
            fetchPriority={t === defaultTheme ? "high" : "low"}
          />
        ))}
      </div>
    </div>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M11.5 8.2A4.5 4.5 0 0 1 5.8 2.5a5 5 0 1 0 5.7 5.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="2.6" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <line x1="7" y1="1" x2="7" y2="2.4" />
        <line x1="7" y1="11.6" x2="7" y2="13" />
        <line x1="1" y1="7" x2="2.4" y2="7" />
        <line x1="11.6" y1="7" x2="13" y2="7" />
        <line x1="2.6" y1="2.6" x2="3.6" y2="3.6" />
        <line x1="10.4" y1="10.4" x2="11.4" y2="11.4" />
        <line x1="2.6" y1="11.4" x2="3.6" y2="10.4" />
        <line x1="10.4" y1="3.6" x2="11.4" y2="2.6" />
      </g>
    </svg>
  );
}
