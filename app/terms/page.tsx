import type { Metadata } from "next";
import { LegalPage, Section, ProseLink } from "@/components/legal/LegalPage";
import {
  LEGAL_LAST_UPDATED,
  PRICING,
  SUPPORT_URL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service — SlideFlow",
  description:
    "Terms governing your use of SlideFlow, including subscription, AI-output disclaimers, and acceptable use.",
  alternates: { languages: { en: "/terms", "zh-Hans": "/zh/terms" } },
};

export default function TermsPage() {
  return (
    <LegalPage
      locale="en"
      title="Terms of Service"
      lastUpdated={LEGAL_LAST_UPDATED}
      intro="These terms govern your use of SlideFlow (&quot;the App&quot;). By installing or using the App, you agree to these terms and to the Apple Media Services Terms that apply to all App Store apps."
    >
      <Section heading="1. License">
        <p>
          SlideFlow grants you a personal, non-transferable, revocable license
          to use the App on devices you own or control, subject to the{" "}
          <ProseLink
            href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            external
          >
            Apple Standard EULA
          </ProseLink>{" "}
          that governs all App Store distributions. You may not redistribute,
          decompile, or attempt to extract the App&apos;s source.
        </p>
      </Section>

      <Section heading="2. Subscription &amp; Billing">
        <p>The App offers a free chat tier and a Pro subscription:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            Monthly: {PRICING.monthly.display} / month
          </li>
          <li>
            Annual: {PRICING.annual.display} / year (≈{" "}
            {PRICING.annual.monthlyEquivalent} / month — save{" "}
            {PRICING.annual.savePercent}%)
          </li>
        </ul>
        <p>
          Both plans include a {PRICING.freeTrialDays}-day free trial. All
          billing, renewal, and cancellation are handled by Apple through your
          Apple ID. SlideFlow does not store your payment information.
        </p>
        <p>
          Subscriptions auto-renew unless canceled at least 24 hours before the
          end of the current period. Cancel any time:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong className="text-text-primary">iPad / iPhone:</strong>{" "}
            Settings → [your name] → Subscriptions
          </li>
          <li>
            <strong className="text-text-primary">macOS:</strong> System
            Settings → Apple ID → Media &amp; Purchases → Subscriptions
          </li>
        </ul>
      </Section>

      <Section heading="3. Refunds">
        <p>
          Refund requests are processed by Apple under their standard refund
          policy. Submit a request at{" "}
          <ProseLink href="https://reportaproblem.apple.com" external>
            reportaproblem.apple.com
          </ProseLink>
          . SlideFlow cannot issue refunds directly because we do not process
          payments.
        </p>
      </Section>

      <Section heading="4. Your Content">
        <p>
          You retain all ownership of decks, slides, prompts, and any content
          you create with SlideFlow. We claim no rights to your work and do not
          collect copies of it.
        </p>
      </Section>

      <Section heading="5. Third-Party AI Providers">
        <p>
          SlideFlow lets you connect your own API keys to third-party AI
          providers (Anthropic, OpenAI, Google Gemini, Groq). You are
          responsible for:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Securing your API keys and any costs incurred with those providers.</li>
          <li>Complying with each provider&apos;s terms of service.</li>
          <li>Verifying that AI-generated output meets your standards before use.</li>
        </ul>
      </Section>

      <Section heading="6. AI Output Disclaimer">
        <p>
          AI-generated content may contain errors, inaccuracies, hallucinations,
          or unintended bias. You are responsible for reviewing any AI output
          before relying on it — especially for professional, public-facing,
          regulated, or safety-critical presentations. SlideFlow makes no
          guarantees about the accuracy, reliability, or fitness of AI output.
        </p>
      </Section>

      <Section heading="7. Acceptable Use">
        <p>You agree not to use the App to:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Create deceptive, defamatory, or fraudulent content.</li>
          <li>Infringe the intellectual-property rights of others.</li>
          <li>Generate content prohibited by applicable law in your jurisdiction.</li>
          <li>Reverse-engineer, scrape, or interfere with the App&apos;s operation.</li>
        </ul>
      </Section>

      <Section heading="8. Disclaimer of Warranty">
        <p>
          The App is provided <strong className="text-text-primary">&quot;as is&quot;</strong>{" "}
          without warranty of any kind, express or implied. We do not warrant
          that the App will be uninterrupted, error-free, or compatible with
          every future operating-system release. Use at your own risk.
        </p>
      </Section>

      <Section heading="9. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, SlideFlow&apos;s aggregate
          liability for any claim arising from your use of the App is limited
          to the amount you paid for the App in the 12 months preceding the
          claim. We are not liable for indirect, incidental, consequential, or
          punitive damages — including lost data, lost profits, or business
          interruption.
        </p>
      </Section>

      <Section heading="10. Termination">
        <p>
          You may stop using the App at any time by canceling your subscription
          and uninstalling. We may discontinue features in future versions.
          These terms survive termination to the extent necessary to enforce
          them.
        </p>
      </Section>

      <Section heading="11. Changes to These Terms">
        <p>
          We may update these terms when the App evolves. The &quot;last
          updated&quot; date at the top reflects the most recent change.
          Continued use after a change means you accept the updated terms.
        </p>
      </Section>

      <Section heading="12. Contact">
        <p>
          For questions about these terms, open a discussion at{" "}
          <ProseLink href={SUPPORT_URL} external>
            github.com/Anderson-Hyl/slideflow-support
          </ProseLink>
          .
        </p>
      </Section>
    </LegalPage>
  );
}
