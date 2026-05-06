import type { Metadata } from "next";
import { LegalPage, Section, ProseLink } from "@/components/legal/LegalPage";
import { LEGAL_LAST_UPDATED, SUPPORT_URL } from "@/lib/constants";
import { withBase } from "@/lib/paths";

export const metadata: Metadata = {
  title: "隐私政策 — SlideFlow",
  description:
    "SlideFlow 如何处理你的数据:API 密钥保存在钥匙串,幻灯片留在你的设备或 iCloud,任何内容都不经过我们的服务器。",
  alternates: {
    languages: {
      en: withBase("/privacy"),
      "zh-Hans": withBase("/zh/privacy"),
    },
  },
};

export default function PrivacyPageZh() {
  return (
    <LegalPage
      locale="zh"
      title="隐私政策"
      lastUpdated={LEGAL_LAST_UPDATED}
      intro="SlideFlow 的承诺很简单:你的幻灯片与提示词只在你和你选择的 AI 供应商之间流转。我们不运营任何会拦截你内容的服务器。"
    >
      <Section heading="1. 我们在服务器上收集什么">
        <p>
          <strong className="text-text-primary">什么也不收集。</strong>
          SlideFlow 是一款通过 App Store 分发的 macOS 与 iPadOS 原生应用。我们没有
          SlideFlow 账户系统、没有遥测管线,也没有集中存储你幻灯片的数据库。
        </p>
      </Section>

      <Section heading="2. 哪些数据留在你的设备上">
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            幻灯片、对话与编辑历史均通过 SQLite 本地存储,可选地通过 Apple
            CloudKit 进行 iCloud 同步。
          </li>
          <li>
            第三方 AI 供应商(Anthropic、OpenAI、Google Gemini、Groq)的 API 密钥
            存储于 macOS 或 iPadOS 钥匙串中,由操作系统加密静态保存。
          </li>
          <li>
            Apple 智能完全在端侧运行。选择该供应商时,任何提示词或内容都不会离开你的硬件。
          </li>
        </ul>
      </Section>

      <Section heading="3. 哪些数据会发送给第三方">
        <p>
          当你通过 SlideFlow 与云端 AI 供应商对话时,提示词与相关幻灯片 HTML 会
          <strong className="text-text-primary">直接从你的设备</strong>发送到该供应商的
          API 端点(例如{" "}
          <code className="text-brand-blue text-[0.92em]">api.anthropic.com</code>
          )。流量不会经过 SlideFlow 的任何基础设施。
        </p>
        <p>各供应商的隐私政策约束他们对该数据的处理:</p>
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
              Google(Gemini)
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
          Apple 负责管理你的订阅、付款信息以及与 Apple ID 关联的任何数据。
          SlideFlow 仅通过 StoreKit 接收操作系统提供的收据回执——绝不会获得你的
          支付方式或完整 Apple ID。Apple 的隐私政策适用:{" "}
          <ProseLink href="https://www.apple.com/legal/privacy/" external>
            apple.com/legal/privacy
          </ProseLink>
          。
        </p>
      </Section>

      <Section heading="5. iCloud 同步">
        <p>
          若启用 iCloud 同步,你的幻灯片与切片实例将通过 CloudKit 在你的 iCloud
          账户内同步。我们无法访问这些数据——它存储于 Apple 的条款下,绑定到你的
          Apple ID。在应用内关闭 iCloud 同步即可让所有内容仅留在本地。
        </p>
      </Section>

      <Section heading="6. 本营销网站">
        <p>
          本网站不使用 Cookies、分析、指纹识别或第三方追踪像素。出于安全目的,
          服务器日志可能记录标准请求元数据(IP 地址、User-Agent、请求路径),
          并定期轮换。
        </p>
      </Section>

      <Section heading="7. 儿童">
        <p>
          SlideFlow 不面向 13 岁以下儿童。我们不会有意收集儿童的个人数据。
          若你认为存在此类情况,请联系我们以便处理。
        </p>
      </Section>

      <Section heading="8. 你的权利">
        <p>
          由于我们不会在自己的服务器上收集或存储你的数据,因此也没有数据可供我们代为导出、
          更正或删除。如需删除本地数据,请卸载应用或使用应用内的「删除幻灯片」操作。
          如需删除 iCloud 同步的数据,请在应用内关闭 iCloud 同步,并在系统设置的 iCloud
          云盘中移除 SlideFlow。
        </p>
      </Section>

      <Section heading="9. 联系方式">
        <p>
          对本政策有问题或顾虑?请前往{" "}
          <ProseLink href={SUPPORT_URL} external>
            支持仓库
          </ProseLink>
          发起讨论。
        </p>
      </Section>

      <Section heading="10. 政策变更">
        <p>
          我们会随应用演进更新本政策。文首「最后更新于」的日期反映最近一次变更。
          重大更改将在应用更新说明中重点提示。
        </p>
      </Section>
    </LegalPage>
  );
}
