import { SlideFlowLogo } from "@/components/icons/SlideFlowLogo";
import { APP_STORE_URL, SUPPORT_URL } from "@/lib/constants";
import { format, localePath, type Dictionary, type Locale } from "@/lib/i18n";

interface FooterProps {
  dict: Dictionary["footer"];
  locale: Locale;
}

export function Footer({ dict, locale }: FooterProps) {
  const links: Array<{ label: string; href: string; external?: boolean }> = [
    { label: dict.privacy, href: localePath(locale, "/privacy") },
    { label: dict.terms, href: localePath(locale, "/terms") },
    { label: dict.support, href: SUPPORT_URL, external: true },
  ];

  return (
    <footer
      className="py-10 px-6"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <a href={localePath(locale)} className="flex items-center gap-2.5">
            <SlideFlowLogo size={24} />
            <span className="text-sm font-semibold text-text-secondary">
              SlideFlow
            </span>
          </a>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-sm text-text-muted hover:text-text-secondary transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* App Store CTA */}
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors duration-200 flex items-center gap-1.5"
          >
            <svg width="12" height="13" viewBox="0 0 13 14" fill="none" aria-hidden="true">
              <path
                d="M9.97 7.41c-.02-1.95 1.59-2.89 1.66-2.93-.9-1.32-2.31-1.5-2.81-1.52-1.2-.12-2.34.7-2.95.7-.62 0-1.55-.69-2.55-.67-1.31.02-2.52.76-3.19 1.93-1.36 2.36-.35 5.85.98 7.77.65.94 1.43 2 2.43 1.96.97-.04 1.34-.63 2.52-.63 1.17 0 1.5.63 2.53.61 1.04-.02 1.7-.96 2.34-1.91.74-1.1 1.04-2.16 1.06-2.22-.02-.01-2.03-.78-2.05-3.09M8.07 1.69c.53-.65.9-1.55.79-2.44-.77.03-1.7.51-2.26 1.16-.49.57-.93 1.5-.81 2.37.86.07 1.74-.44 2.28-1.09"
                fill="currentColor"
              />
            </svg>
            {dict.appStore}
          </a>
        </div>

        <p className="text-center text-xs text-text-muted mt-8">
          {format(dict.copyright, { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
