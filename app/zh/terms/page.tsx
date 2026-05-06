import type { Metadata } from "next";
import { LegalPage, Section, ProseLink } from "@/components/legal/LegalPage";
import {
  LEGAL_LAST_UPDATED,
  PRICING,
  SUPPORT_URL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "服务条款 — SlideFlow",
  description:
    "管辖你使用 SlideFlow 的条款,包含订阅、AI 输出免责声明与可接受使用规范。",
  alternates: { languages: { en: "/terms", "zh-Hans": "/zh/terms" } },
};

export default function TermsPageZh() {
  return (
    <LegalPage
      locale="zh"
      title="服务条款"
      lastUpdated={LEGAL_LAST_UPDATED}
      intro="本条款管辖你对 SlideFlow(以下简称「本应用」)的使用。安装或使用本应用即表示你同意本条款,以及适用于所有 App Store 应用的 Apple 媒体服务条款。"
    >
      <Section heading="1. 授权">
        <p>
          SlideFlow 授予你在你拥有或控制的设备上使用本应用的个人、不可转让、可撤销许可,
          并受{" "}
          <ProseLink
            href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            external
          >
            Apple 标准 EULA
          </ProseLink>{" "}
          约束(该 EULA 适用于所有 App Store 分发的应用)。你不得再分发、反编译或试图提取
          本应用的源代码。
        </p>
      </Section>

      <Section heading="2. 订阅与计费">
        <p>本应用提供免费对话档与 Pro 订阅:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>按月: {PRICING.monthly.display} / 月</li>
          <li>
            按年: {PRICING.annual.display} / 年(约{" "}
            {PRICING.annual.monthlyEquivalent} / 月——省 {PRICING.annual.savePercent}%)
          </li>
        </ul>
        <p>
          两种方案均含 {PRICING.freeTrialDays} 天免费试用。所有计费、续订与取消均由 Apple
          通过你的 Apple ID 处理。SlideFlow 不存储你的支付信息。
        </p>
        <p>除非在当前周期结束前至少 24 小时取消,否则订阅将自动续订。可随时取消:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>
            <strong className="text-text-primary">iPad / iPhone:</strong>
            「设置」 → [你的姓名] → 「订阅」
          </li>
          <li>
            <strong className="text-text-primary">macOS:</strong>
            「系统设置」 → 「Apple ID」 → 「媒体与购买项目」 → 「订阅」
          </li>
        </ul>
      </Section>

      <Section heading="3. 退款">
        <p>
          退款请求由 Apple 按其标准退款政策处理。请前往{" "}
          <ProseLink href="https://reportaproblem.apple.com" external>
            reportaproblem.apple.com
          </ProseLink>{" "}
          提交申请。SlideFlow 无法直接发起退款,因为我们不处理付款。
        </p>
      </Section>

      <Section heading="4. 你的内容">
        <p>
          你保留对自己使用 SlideFlow 创建的所有幻灯片、提示词及任何内容的所有权。
          我们不主张对你作品的任何权利,也不会收集副本。
        </p>
      </Section>

      <Section heading="5. 第三方 AI 供应商">
        <p>
          SlideFlow 允许你连接自己的 API 密钥到第三方 AI 供应商(Anthropic、OpenAI、
          Google Gemini、Groq)。你需自行负责:
        </p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>保管自己的 API 密钥,以及在这些供应商处产生的费用。</li>
          <li>遵守每个供应商的服务条款。</li>
          <li>在使用 AI 生成的内容前,核验其是否符合你的标准。</li>
        </ul>
      </Section>

      <Section heading="6. AI 输出免责声明">
        <p>
          AI 生成的内容可能含有错误、不准确、幻觉或意料之外的偏见。你需自行负责在依赖
          任何 AI 输出之前进行审阅——尤其是用于专业、公开、受监管或安全关键场景的演示。
          SlideFlow 不对 AI 输出的准确性、可靠性或适用性作任何保证。
        </p>
      </Section>

      <Section heading="7. 可接受使用">
        <p>你同意不使用本应用进行以下行为:</p>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>创作具有欺骗性、诽谤性或欺诈性的内容。</li>
          <li>侵犯他人的知识产权。</li>
          <li>生成你所在司法辖区适用法律所禁止的内容。</li>
          <li>对本应用的运行进行逆向工程、爬取或干扰。</li>
        </ul>
      </Section>

      <Section heading="8. 不作担保">
        <p>
          本应用按
          <strong className="text-text-primary">「现状」</strong>
          提供,不作任何明示或默示的担保。我们不保证本应用不中断、无错误或与未来每个
          操作系统版本兼容。使用风险由你自行承担。
        </p>
      </Section>

      <Section heading="9. 责任限制">
        <p>
          在适用法律允许的最大范围内,SlideFlow 因你使用本应用所产生的任何索赔的总责任,
          仅限于在索赔提出前 12 个月内你为本应用支付的金额。我们不对间接、附带、后果性或
          惩罚性损害负责——包括数据丢失、利润损失或业务中断。
        </p>
      </Section>

      <Section heading="10. 终止">
        <p>
          你可随时通过取消订阅与卸载应用停止使用。我们可能在未来版本中停止某些功能。
          为执行本条款的需要,本条款的相关部分在终止后继续有效。
        </p>
      </Section>

      <Section heading="11. 条款变更">
        <p>
          我们可能随应用演进更新本条款。文首「最后更新于」的日期反映最近一次变更。
          变更后继续使用即表示你接受更新后的条款。
        </p>
      </Section>

      <Section heading="12. 联系方式">
        <p>
          关于本条款的问题,请前往{" "}
          <ProseLink href={SUPPORT_URL} external>
            github.com/Anderson-Hyl/slideflow-support
          </ProseLink>{" "}
          发起讨论。
        </p>
      </Section>
    </LegalPage>
  );
}
