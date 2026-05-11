import type { Metadata } from "next";
import { LegalPage, Section, ProseLink } from "@/components/legal/LegalPage";
import { LEGAL_LAST_UPDATED, SUPPORT_URL } from "@/lib/constants";
import { withBase } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Privacy Policy — SlideFlow",
  description:
    "How SlideFlow handles your data: BYOK API keys stay in Keychain, decks stay on your device or in your iCloud, and nothing is proxied through our servers.",
  alternates: {
    languages: {
      en: withBase("/privacy"),
      "zh-Hans": withBase("/zh/privacy"),
    },
  },
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

      <Section heading="4. Third-Party AI Services">
        <p>
          SlideFlow can connect to third-party AI services to author slides on
          your behalf, using API keys you supply. SlideFlow does not sell,
          monetize, or share users&apos; personal data with third parties for
          advertising, profiling, or any other purposes.
        </p>
        <p>The four supported third-party AI providers are:</p>
        <div className="overflow-x-auto -mx-2">
          <table className="min-w-full text-sm border-separate border-spacing-0">
            <thead>
              <tr className="text-left text-text-primary">
                <th className="font-semibold py-2 px-3 border-b border-border align-bottom">
                  Provider
                </th>
                <th className="font-semibold py-2 px-3 border-b border-border align-bottom">
                  Operator
                </th>
                <th className="font-semibold py-2 px-3 border-b border-border align-bottom">
                  Endpoint
                </th>
                <th className="font-semibold py-2 px-3 border-b border-border align-bottom">
                  Privacy Policy
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-3 border-b border-border-subtle align-top text-text-primary">
                  Claude
                </td>
                <td className="py-2 px-3 border-b border-border-subtle align-top">
                  Anthropic, PBC
                </td>
                <td className="py-2 px-3 border-b border-border-subtle align-top">
                  <code className="text-brand-blue text-[0.92em]">
                    api.anthropic.com
                  </code>
                </td>
                <td className="py-2 px-3 border-b border-border-subtle align-top">
                  <ProseLink
                    href="https://www.anthropic.com/legal/privacy"
                    external
                  >
                    anthropic.com/legal/privacy
                  </ProseLink>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 border-b border-border-subtle align-top text-text-primary">
                  Gemini
                </td>
                <td className="py-2 px-3 border-b border-border-subtle align-top">
                  Google LLC
                </td>
                <td className="py-2 px-3 border-b border-border-subtle align-top">
                  <code className="text-brand-blue text-[0.92em]">
                    generativelanguage.googleapis.com
                  </code>
                </td>
                <td className="py-2 px-3 border-b border-border-subtle align-top">
                  <ProseLink
                    href="https://policies.google.com/privacy"
                    external
                  >
                    policies.google.com/privacy
                  </ProseLink>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 border-b border-border-subtle align-top text-text-primary">
                  Llama (via Groq)
                </td>
                <td className="py-2 px-3 border-b border-border-subtle align-top">
                  Groq, Inc.
                </td>
                <td className="py-2 px-3 border-b border-border-subtle align-top">
                  <code className="text-brand-blue text-[0.92em]">
                    api.groq.com
                  </code>
                </td>
                <td className="py-2 px-3 border-b border-border-subtle align-top">
                  <ProseLink href="https://groq.com/privacy-policy/" external>
                    groq.com/privacy-policy
                  </ProseLink>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 align-top text-text-primary">GPT</td>
                <td className="py-2 px-3 align-top">OpenAI, OpCo, LLC</td>
                <td className="py-2 px-3 align-top">
                  <code className="text-brand-blue text-[0.92em]">
                    api.openai.com
                  </code>
                </td>
                <td className="py-2 px-3 align-top">
                  <ProseLink
                    href="https://openai.com/policies/privacy-policy/"
                    external
                  >
                    openai.com/policies/privacy-policy
                  </ProseLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          When you connect one of these services, SlideFlow sends the following
          data{" "}
          <strong className="text-text-primary">directly from your device</strong>{" "}
          to the provider&apos;s API: (a) the messages in your current
          conversation, (b) the system instructions describing SlideFlow&apos;s
          slide-authoring tools, (c) the HTML body of any slide the model is
          editing. SlideFlow does not run any intermediate server — requests go
          straight from your Mac or iPad to the provider&apos;s API. Your API
          key is stored in the Apple Keychain on your device.
        </p>
        <p>
          Each provider acts solely as a{" "}
          <strong className="text-text-primary">data processor</strong> on
          SlideFlow&apos;s behalf — they process the data we send them to
          provide the slide-authoring service you requested, and that
          processing is governed by each provider&apos;s own terms. SlideFlow
          does not control the third party&apos;s practices, but we disclose
          below what each provider&apos;s published terms say about training:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong className="text-text-primary">Anthropic</strong>{" "}
            (Commercial Terms § B): Anthropic does not train its models on data
            sent through the API.
          </li>
          <li>
            <strong className="text-text-primary">Google</strong> (Gemini API
            terms): Google does not train its models on data sent through the{" "}
            <strong className="text-text-primary">paid</strong> Gemini API (any
            Cloud project with billing enabled). The{" "}
            <strong className="text-text-primary">free</strong> tier may be
            used for product improvement; review Google&apos;s terms before
            connecting a free-tier key.
          </li>
          <li>
            <strong className="text-text-primary">Groq</strong> (privacy
            policy): Groq processes API data as a data processor on its
            customers&apos; behalf. Groq&apos;s published terms do not
            explicitly commit to excluding API data from model training; review
            the Groq Services Agreement for the most current position.
          </li>
          <li>
            <strong className="text-text-primary">OpenAI</strong> (API data
            usage policy, effective March 1, 2023): OpenAI does not use API
            data to train its models by default.
          </li>
        </ul>
        <p>
          Each third-party provider has published terms that, in our reading,
          provide protection of user data comparable to the protections in
          this privacy policy. We do not share or sell data to third-party AI
          providers beyond the direct-to-API flow described above.
        </p>

        <h3 className="text-lg md:text-xl font-semibold text-text-primary mt-2 tracking-tight">
          Your Permission
        </h3>
        <p>
          SlideFlow requires your{" "}
          <strong className="text-text-primary">
            explicit, per-provider permission
          </strong>{" "}
          before sending any data to a third-party AI service. The first time
          you save an API key or send a message to any of the four cloud
          providers above, SlideFlow presents a consent sheet identifying the
          provider, the data being sent, the destination host, and the
          provider&apos;s role. You may tap{" "}
          <strong className="text-text-primary">&quot;Don&apos;t allow&quot;</strong>{" "}
          to cancel the action with no data leaving your device, or{" "}
          <strong className="text-text-primary">
            &quot;Continue with AI&quot;
          </strong>{" "}
          to grant consent for that provider. Consent is stored locally on
          your device and can be revoked at any time in{" "}
          <strong className="text-text-primary">
            Settings → Providers → [Provider] → Revoke consent
          </strong>
          .
        </p>

        <h3 className="text-lg md:text-xl font-semibold text-text-primary mt-2 tracking-tight">
          Local-Only Paths
        </h3>
        <p>
          SlideFlow also supports modes that{" "}
          <strong className="text-text-primary">do not</strong> transmit data
          to any third party:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong className="text-text-primary">
              Apple Foundation Models
            </strong>{" "}
            runs entirely on your device.
          </li>
          <li>
            <strong className="text-text-primary">On-device MLX</strong> loads
            model weights from Hugging Face on first use and runs inference
            locally; no inference-time network calls.
          </li>
          <li>
            <strong className="text-text-primary">Claude Code CLI</strong> is a
            separate Anthropic command-line tool invoked as a subprocess.
            SlideFlow does not hold your Claude Code credentials or send data
            via that tool. (Claude Code itself transmits data to Anthropic per
            its own terms — that relationship is between you and Anthropic,
            not mediated by SlideFlow.)
          </li>
        </ul>
        <p>
          These paths do not trigger the consent flow because no
          SlideFlow-mediated transmission to a third party occurs.
        </p>
      </Section>

      <Section heading="5. Apple App Store">
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

      <Section heading="6. iCloud Sync">
        <p>
          If you enable iCloud sync, your decks and slide instances are synced
          through your iCloud account using CloudKit. We do not have access to
          this data — it is stored under Apple&apos;s terms and bound to your
          Apple ID. Disabling iCloud sync in the app keeps every deck local.
        </p>
      </Section>

      <Section heading="7. This Marketing Website">
        <p>
          This website does not use cookies, analytics, fingerprinting, or
          third-party tracking pixels. Server logs may capture standard request
          metadata for security purposes (IP address, user agent, request path)
          and are rotated regularly.
        </p>
      </Section>

      <Section heading="8. Children">
        <p>
          SlideFlow is not directed at children under 13. We do not knowingly
          collect personal data from children. If you believe we have, please
          contact us so we can address it.
        </p>
      </Section>

      <Section heading="9. Your Rights">
        <p>
          Because we do not collect or store your data on our servers, there is
          nothing for us to export, correct, or delete on your behalf. To remove
          local data, uninstall the app or use the app&apos;s built-in &quot;Delete
          Deck&quot; action. To remove iCloud-synced data, disable iCloud sync
          in the app and remove the app from your iCloud Drive in System
          Settings.
        </p>
      </Section>

      <Section heading="10. Contact">
        <p>
          Questions or concerns about this policy? Open a discussion on{" "}
          <ProseLink href={SUPPORT_URL} external>
            our support repository
          </ProseLink>
          .
        </p>
      </Section>

      <Section heading="11. Changes to This Policy">
        <p>
          We may update this policy when the app evolves. The &quot;last
          updated&quot; date at the top reflects the most recent change.
          Material changes will be highlighted in the app&apos;s release notes.
        </p>
      </Section>
    </LegalPage>
  );
}
