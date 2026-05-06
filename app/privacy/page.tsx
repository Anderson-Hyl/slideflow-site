import type { Metadata } from "next";
import { LegalPage, Section, ProseLink } from "@/components/legal/LegalPage";
import { LEGAL_LAST_UPDATED, SUPPORT_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy — SlideFlow",
  description:
    "How SlideFlow handles your data: BYOK API keys stay in Keychain, decks stay on your device or in your iCloud, and nothing is proxied through our servers.",
  alternates: { languages: { en: "/privacy", "zh-Hans": "/zh/privacy" } },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      locale="en"
      title="Privacy Policy"
      lastUpdated={LEGAL_LAST_UPDATED}
      intro="SlideFlow is built around a simple promise: your slides and prompts stay between you and the AI provider you choose. We do not run servers that intercept your content."
    >
      <Section heading="1. What We Collect on Our Servers">
        <p>
          <strong className="text-text-primary">Nothing.</strong> SlideFlow is a
          native macOS and iPadOS app distributed through the App Store. There
          is no SlideFlow account, no telemetry pipeline, and no central
          database of your decks.
        </p>
      </Section>

      <Section heading="2. What Stays on Your Device">
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            Your decks, slides, conversations, and edit history are stored
            locally using SQLite, with optional iCloud sync via Apple&apos;s
            CloudKit.
          </li>
          <li>
            API keys for third-party AI providers (Anthropic, OpenAI, Google
            Gemini, Groq) are stored in the macOS or iPadOS Keychain — encrypted
            at rest by the operating system.
          </li>
          <li>
            Apple Intelligence runs entirely on-device. No prompt or content
            ever leaves your hardware when you select that provider.
          </li>
        </ul>
      </Section>

      <Section heading="3. What Goes to Third Parties">
        <p>
          When you chat with a cloud AI provider through SlideFlow, your prompt
          and the relevant slide HTML are sent{" "}
          <strong className="text-text-primary">directly from your device</strong>{" "}
          to the provider&apos;s API endpoint (for example,{" "}
          <code className="text-brand-blue text-[0.92em]">api.anthropic.com</code>).
          The traffic does not pass through SlideFlow infrastructure.
        </p>
        <p>
          Each provider&apos;s privacy policy applies to how they handle that
          data:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <ProseLink href="https://www.anthropic.com/legal/privacy" external>
              Anthropic
            </ProseLink>
          </li>
          <li>
            <ProseLink href="https://openai.com/policies/privacy-policy" external>
              OpenAI
            </ProseLink>
          </li>
          <li>
            <ProseLink href="https://policies.google.com/privacy" external>
              Google (Gemini)
            </ProseLink>
          </li>
          <li>
            <ProseLink href="https://groq.com/privacy-policy/" external>
              Groq
            </ProseLink>
          </li>
        </ul>
      </Section>

      <Section heading="4. Apple App Store">
        <p>
          Apple manages your subscription, payment information, and any data
          tied to your Apple ID. SlideFlow receives only the receipt
          confirmation that the OS exposes via StoreKit — never your payment
          method or full Apple ID. Apple&apos;s privacy policy applies:{" "}
          <ProseLink href="https://www.apple.com/legal/privacy/" external>
            apple.com/legal/privacy
          </ProseLink>
          .
        </p>
      </Section>

      <Section heading="5. iCloud Sync">
        <p>
          If you enable iCloud sync, your decks and slide instances are synced
          through your iCloud account using CloudKit. We do not have access to
          this data — it is stored under Apple&apos;s terms and bound to your
          Apple ID. Disabling iCloud sync in the app keeps every deck local.
        </p>
      </Section>

      <Section heading="6. This Marketing Website">
        <p>
          This website does not use cookies, analytics, fingerprinting, or
          third-party tracking pixels. Server logs may capture standard request
          metadata for security purposes (IP address, user agent, request path)
          and are rotated regularly.
        </p>
      </Section>

      <Section heading="7. Children">
        <p>
          SlideFlow is not directed at children under 13. We do not knowingly
          collect personal data from children. If you believe we have, please
          contact us so we can address it.
        </p>
      </Section>

      <Section heading="8. Your Rights">
        <p>
          Because we do not collect or store your data on our servers, there is
          nothing for us to export, correct, or delete on your behalf. To remove
          local data, uninstall the app or use the app&apos;s built-in &quot;Delete
          Deck&quot; action. To remove iCloud-synced data, disable iCloud sync
          in the app and remove the app from your iCloud Drive in System
          Settings.
        </p>
      </Section>

      <Section heading="9. Contact">
        <p>
          Questions or concerns about this policy? Open a discussion on{" "}
          <ProseLink href={SUPPORT_URL} external>
            our support repository
          </ProseLink>
          .
        </p>
      </Section>

      <Section heading="10. Changes to This Policy">
        <p>
          We may update this policy when the app evolves. The &quot;last
          updated&quot; date at the top reflects the most recent change.
          Material changes will be highlighted in the app&apos;s release notes.
        </p>
      </Section>
    </LegalPage>
  );
}
