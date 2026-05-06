"use client";

import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n";
import { withBase } from "@/lib/paths";

const labels: Record<Locale, string> = {
  en: "EN",
  zh: "中",
};

interface LanguageSwitcherProps {
  current: Locale;
}

export function LanguageSwitcher({ current }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/";

  /**
   * Compute the path for a target locale that preserves the current sub-page
   * when possible. Examples:
   *   /privacy    + zh → /zh/privacy
   *   /zh/terms   + en → /terms
   *   /           + zh → /zh
   *   /zh         + en → /
   */
  const hrefFor = (target: Locale): string => {
    const stripped = pathname.replace(/^\/zh(?=\/|$)/, "") || "/";
    const path =
      target === "en"
        ? stripped
        : stripped === "/"
          ? "/zh"
          : `/zh${stripped}`;
    return withBase(path);
  };

  return (
    <div
      className="flex items-center gap-0.5 p-0.5 rounded-pill"
      style={{
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      {LOCALES.map((loc) => {
        const active = loc === current;
        return (
          <a
            key={loc}
            href={hrefFor(loc)}
            aria-current={active ? "page" : undefined}
            className="px-2.5 py-1 rounded-pill text-xs font-semibold transition-all duration-200"
            style={
              active
                ? {
                    background:
                      "linear-gradient(135deg, #2D5AB3 0%, #4C81DD 30%, #5C8FE6 60%, #7AA5FA 100%)",
                    color: "white",
                  }
                : { color: "#888888" }
            }
          >
            {labels[loc]}
          </a>
        );
      })}
    </div>
  );
}
