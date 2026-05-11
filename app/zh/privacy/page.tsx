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

      <Section heading="4. 第三方 AI 服务">
        <p>
          SlideFlow 可以使用你提供的 API 密钥连接第三方 AI 服务,代你创作幻灯片。
          SlideFlow 不会出于广告、画像或任何其他目的,出售、变现或与第三方共享
          用户的个人数据。
        </p>
        <p>当前支持的四家第三方 AI 供应商如下:</p>
        <div className="overflow-x-auto -mx-2">
          <table className="min-w-full text-sm border-separate border-spacing-0">
            <thead>
              <tr className="text-left text-text-primary">
                <th className="font-semibold py-2 px-3 border-b border-border align-bottom">
                  服务
                </th>
                <th className="font-semibold py-2 px-3 border-b border-border align-bottom">
                  运营方
                </th>
                <th className="font-semibold py-2 px-3 border-b border-border align-bottom">
                  接入端点
                </th>
                <th className="font-semibold py-2 px-3 border-b border-border align-bottom">
                  隐私政策
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
                  Llama(通过 Groq)
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
          当你连接上述服务时,SlideFlow 会将以下数据
          <strong className="text-text-primary">直接从你的设备</strong>
          发送至该供应商的 API:(a) 当前会话中的消息内容,(b) 描述
          SlideFlow 幻灯片创作工具的系统指令,(c) 模型正在编辑的幻灯片 HTML
          内容。SlideFlow 不运行任何中间服务器——请求直接从你的 Mac 或 iPad
          发往供应商 API。你的 API 密钥保存在设备上的 Apple 钥匙串中。
        </p>
        <p>
          每家供应商均仅以
          <strong className="text-text-primary">数据处理者</strong>
          的身份代 SlideFlow 处理数据——他们处理我们发送的数据,以提供你所请求的
          幻灯片创作服务,该处理受供应商各自条款约束。SlideFlow 并不控制第三方
          的具体做法,但我们在下方披露了各供应商已公开的训练相关条款立场:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong className="text-text-primary">Anthropic</strong>(商业条款
            第 B 节):Anthropic 不会使用通过 API 发送的数据训练其模型。
          </li>
          <li>
            <strong className="text-text-primary">Google</strong>(Gemini API
            条款):Google 不会使用通过
            <strong className="text-text-primary">付费</strong> Gemini API
            (任何已开启计费的 Cloud 项目)发送的数据训练其模型。
            <strong className="text-text-primary">免费</strong>
            档可能会被用于产品改进;在连接免费档密钥前请先审阅 Google 条款。
          </li>
          <li>
            <strong className="text-text-primary">Groq</strong>(隐私政策):
            Groq 作为数据处理者代客户处理 API 数据。Groq 已公开的条款并未
            明确承诺将 API 数据排除在模型训练之外;请以 Groq Services Agreement
            的最新版本为准。
          </li>
          <li>
            <strong className="text-text-primary">OpenAI</strong>(API 数据使用
            政策,自 2023 年 3 月 1 日起生效):OpenAI 默认不会使用 API 数据
            训练其模型。
          </li>
        </ul>
        <p>
          在我们的理解中,上述每家第三方供应商所公开的条款,均能为用户数据
          提供与本隐私政策相当的保护。除上述直连 API 的数据流之外,我们不会与
          任何第三方 AI 供应商共享或出售数据。
        </p>

        <h3 className="text-lg md:text-xl font-semibold text-text-primary mt-2 tracking-tight">
          你的授权
        </h3>
        <p>
          在向任何第三方 AI 服务发送数据之前,SlideFlow 需要你
          <strong className="text-text-primary">逐供应商的明确授权</strong>。
          当你首次保存上述四家云端供应商之一的 API 密钥或向其发送消息时,
          SlideFlow 会弹出一份授权说明,标明供应商身份、将要发送的数据、
          目标主机以及供应商所承担的角色。你可以点按
          <strong className="text-text-primary">「不允许」</strong>
          取消该操作,任何数据都不会离开你的设备;也可以点按
          <strong className="text-text-primary">「继续使用 AI」</strong>
          授予该供应商权限。授权状态仅存储于你的本地设备,可随时在
          <strong className="text-text-primary">
            「设置 → 供应商 →〔对应供应商〕→ 撤销授权」
          </strong>
          中撤回。
        </p>

        <h3 className="text-lg md:text-xl font-semibold text-text-primary mt-2 tracking-tight">
          纯本地路径
        </h3>
        <p>
          SlideFlow 还支持<strong className="text-text-primary">不会</strong>
          向任何第三方传输数据的运行模式:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong className="text-text-primary">Apple Foundation Models</strong>
            完全在你的设备上运行。
          </li>
          <li>
            <strong className="text-text-primary">端侧 MLX</strong>
            会在首次使用时从 Hugging Face 下载模型权重,推理阶段在本地完成,
            不再产生网络请求。
          </li>
          <li>
            <strong className="text-text-primary">Claude Code CLI</strong>
            是 Anthropic 提供的独立命令行工具,以子进程方式被调用。SlideFlow
            不会持有你的 Claude Code 凭据,也不会通过该工具发送数据。
            (Claude Code 自身会按其条款将数据传输给 Anthropic——该关系存在于
            你与 Anthropic 之间,并非由 SlideFlow 中介。)
          </li>
        </ul>
        <p>
          这些路径不会触发授权流程,因为 SlideFlow 并未中介任何到第三方的传输。
        </p>
      </Section>

      <Section heading="5. Apple App Store">
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

      <Section heading="6. iCloud 同步">
        <p>
          若启用 iCloud 同步,你的幻灯片与切片实例将通过 CloudKit 在你的 iCloud
          账户内同步。我们无法访问这些数据——它存储于 Apple 的条款下,绑定到你的
          Apple ID。在应用内关闭 iCloud 同步即可让所有内容仅留在本地。
        </p>
      </Section>

      <Section heading="7. 本营销网站">
        <p>
          本网站不使用 Cookies、分析、指纹识别或第三方追踪像素。出于安全目的,
          服务器日志可能记录标准请求元数据(IP 地址、User-Agent、请求路径),
          并定期轮换。
        </p>
      </Section>

      <Section heading="8. 儿童">
        <p>
          SlideFlow 不面向 13 岁以下儿童。我们不会有意收集儿童的个人数据。
          若你认为存在此类情况,请联系我们以便处理。
        </p>
      </Section>

      <Section heading="9. 你的权利">
        <p>
          由于我们不会在自己的服务器上收集或存储你的数据,因此也没有数据可供我们代为导出、
          更正或删除。如需删除本地数据,请卸载应用或使用应用内的「删除幻灯片」操作。
          如需删除 iCloud 同步的数据,请在应用内关闭 iCloud 同步,并在系统设置的 iCloud
          云盘中移除 SlideFlow。
        </p>
      </Section>

      <Section heading="10. 联系方式">
        <p>
          对本政策有问题或顾虑?请前往{" "}
          <ProseLink href={SUPPORT_URL} external>
            支持仓库
          </ProseLink>
          发起讨论。
        </p>
      </Section>

      <Section heading="11. 政策变更">
        <p>
          我们会随应用演进更新本政策。文首「最后更新于」的日期反映最近一次变更。
          重大更改将在应用更新说明中重点提示。
        </p>
      </Section>
    </LegalPage>
  );
}
