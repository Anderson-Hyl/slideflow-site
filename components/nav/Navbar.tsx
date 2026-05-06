import { SlideFlowLogo } from "@/components/icons/SlideFlowLogo";
import { LanguageSwitcher } from "@/components/nav/LanguageSwitcher";
import { APP_STORE_URL } from "@/lib/constants";
import { localePath, type Dictionary, type Locale } from "@/lib/i18n";

interface NavbarProps {
  dict: Dictionary["nav"];
  locale: Locale;
}

export function Navbar({ dict, locale }: NavbarProps) {
  const navItems = [
    { label: dict.features, anchor: "features" },
    { label: dict.howItWorks, anchor: "how-it-works" },
    { label: dict.pricing, anchor: "pricing" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-14"
      style={{
        background: "rgba(6,6,6,0.7)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Brand */}
        <a href={localePath(locale)} className="flex items-center gap-2.5">
          <SlideFlowLogo size={28} />
          <span className="text-text-primary font-semibold text-sm tracking-tight">
            SlideFlow
          </span>
        </a>

        {/* Nav links – hidden on mobile */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.anchor}
              href={`${localePath(locale)}#${item.anchor}`}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2.5">
          <LanguageSwitcher current={locale} />

          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-btn text-sm font-semibold text-white transition-all duration-200"
            style={{
              background:
                "linear-gradient(135deg, #2D5AB3 0%, #4C81DD 30%, #5C8FE6 60%, #7AA5FA 100%)",
            }}
          >
            <AppleGlyph />
            App Store
          </a>
        </div>
      </div>
    </header>
  );
}

function AppleGlyph() {
  return (
    <svg width="13" height="14" viewBox="0 0 13 14" fill="none" aria-hidden="true">
      <path
        d="M9.97 7.41c-.02-1.95 1.59-2.89 1.66-2.93-.9-1.32-2.31-1.5-2.81-1.52-1.2-.12-2.34.7-2.95.7-.62 0-1.55-.69-2.55-.67-1.31.02-2.52.76-3.19 1.93-1.36 2.36-.35 5.85.98 7.77.65.94 1.43 2 2.43 1.96.97-.04 1.34-.63 2.52-.63 1.17 0 1.5.63 2.53.61 1.04-.02 1.7-.96 2.34-1.91.74-1.1 1.04-2.16 1.06-2.22-.02-.01-2.03-.78-2.05-3.09M8.07 1.69c.53-.65.9-1.55.79-2.44-.77.03-1.7.51-2.26 1.16-.49.57-.93 1.5-.81 2.37.86.07 1.74-.44 2.28-1.09"
        fill="currentColor"
      />
    </svg>
  );
}
