import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/sections/Footer";
import { format, getDictionary, type Locale } from "@/lib/i18n";

interface LegalPageProps {
  locale: Locale;
  title: string;
  intro?: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPage({
  locale,
  title,
  intro,
  lastUpdated,
  children,
}: LegalPageProps) {
  const dict = getDictionary(locale);
  const eyebrow = format(dict.legal.eyebrow, { date: lastUpdated });

  return (
    <>
      <Navbar dict={dict.nav} locale={locale} />
      <main lang={dict.htmlLang} className="pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-text-muted mb-4">
            {eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">
            {title}
          </h1>
          {intro && (
            <p className="text-lg text-text-secondary leading-relaxed mb-12">
              {intro}
            </p>
          )}
          <div className="legal-prose flex flex-col gap-10">{children}</div>
        </article>
      </main>
      <Footer dict={dict.footer} locale={locale} />
    </>
  );
}

interface SectionProps {
  heading: string;
  children: React.ReactNode;
}

export function Section({ heading, children }: SectionProps) {
  return (
    <section>
      <h2 className="text-xl md:text-2xl font-semibold text-text-primary mb-4 tracking-tight">
        {heading}
      </h2>
      <div className="flex flex-col gap-4 text-text-secondary leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export function ProseLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a
      href={href}
      className="text-brand-blue hover:underline underline-offset-4"
      {...externalProps}
    >
      {children}
    </a>
  );
}
