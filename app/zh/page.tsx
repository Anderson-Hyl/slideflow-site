import { Navbar } from "@/components/nav/Navbar";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Showcase } from "@/components/sections/Showcase";
import { Pricing } from "@/components/sections/Pricing";
import { Footer } from "@/components/sections/Footer";
import { getDictionary } from "@/lib/i18n";
import { withBase } from "@/lib/paths";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SlideFlow — 适用于 Mac 与 iPad 的 AI 演示文稿",
  description:
    "用 Claude、Gemini、Groq 或 Apple 端侧智能,在实时 Reveal.js 画布上创作精美幻灯片。导出为网页、MP4、PDF 或 PNG。",
  alternates: {
    languages: { "zh-Hans": withBase("/zh"), en: withBase("/") },
  },
};

export default function HomeZh() {
  const dict = getDictionary("zh");
  return (
    <div lang={dict.htmlLang}>
      <Navbar dict={dict.nav} locale="zh" />
      <main>
        <Hero dict={dict.hero} />
        <HowItWorks dict={dict.howItWorks} />
        <Features dict={dict.features} />
        <Showcase dict={dict.showcase} />
        <Pricing dict={dict.pricing} />
      </main>
      <Footer dict={dict.footer} locale="zh" />
    </div>
  );
}
