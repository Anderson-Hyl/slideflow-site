import { Navbar } from "@/components/nav/Navbar";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Showcase } from "@/components/sections/Showcase";
import { Pricing } from "@/components/sections/Pricing";
import { Footer } from "@/components/sections/Footer";
import { getDictionary } from "@/lib/i18n";

export default function Home() {
  const dict = getDictionary("en");
  return (
    <>
      <Navbar dict={dict.nav} locale="en" />
      <main>
        <Hero dict={dict.hero} />
        <HowItWorks dict={dict.howItWorks} />
        <Features dict={dict.features} />
        <Showcase dict={dict.showcase} />
        <Pricing dict={dict.pricing} />
      </main>
      <Footer dict={dict.footer} locale="en" />
    </>
  );
}
