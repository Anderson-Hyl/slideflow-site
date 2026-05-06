import { withBase } from "./paths";

export type Locale = "en" | "zh";

export const LOCALES: readonly Locale[] = ["en", "zh"] as const;

/** Path prefix for a locale. English is at root; Chinese is at /zh.
 *  Result includes the deploy basePath when running on GitHub Pages. */
export function localePath(locale: Locale, path = ""): string {
  const base = locale === "en" ? "" : `/${locale}`;
  if (!path) return withBase(base || "/");
  return withBase(`${base}${path.startsWith("/") ? path : `/${path}`}`);
}

/** Substitute `{key}` placeholders in a translated string. */
export function format(
  template: string,
  params: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in params ? String(params[key]) : `{${key}}`
  );
}

/** Shape of every translatable string used on the marketing site. */
export interface Dictionary {
  locale: Locale;
  htmlLang: string;

  nav: {
    features: string;
    howItWorks: string;
    pricing: string;
  };

  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineEmphasis: string;
    headlineLine3: string;
    subhead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    /** Uses {price} and {days} placeholders. */
    fineprint: string;
  };

  howItWorks: {
    sectionLabel: string;
    titlePrefix: string;
    titleEmphasis: string;
    tagline: string;
    steps: Array<{ title: string; body: string }>;
  };

  features: {
    sectionLabel: string;
    titlePrefix: string;
    titleEmphasis: string;
    tagline: string;
    liveCanvas: { eyebrow: string; title: string; body: string };
    aiProviders: {
      eyebrow: string;
      title: string;
      body: string;
      onDevice: string;
    };
    mcp: { eyebrow: string; title: string; body: string };
    richExport: { eyebrow: string; title: string; body: string };
  };

  showcase: {
    sectionLabel: string;
    titlePrefix: string;
    titleEmphasis: string;
    tagline: string;
    commandPalette: {
      eyebrow: string;
      titlePrefix: string;
      titleEmphasis: string;
      body: string;
      shortcuts: Array<{ label: string; key: string }>;
    };
    byok: {
      eyebrow: string;
      titlePrefix: string;
      titleEmphasis: string;
      body: string;
      bullets: string[];
    };
    lightDark: {
      eyebrow: string;
      titlePrefix: string;
      titleEmphasis: string;
      body: string;
      darkLabel: string;
      lightLabel: string;
    };
  };

  pricing: {
    sectionLabel: string;
    titlePrefix: string;
    titleEmphasis: string;
    tagline: string;
    monthly: string;
    annual: string;
    /** Uses {n} placeholder. */
    save: string;
    free: {
      tag: string;
      forever: string;
      note: string;
      features: string[];
      cta: string;
    };
    pro: {
      tag: string;
      perMonth: string;
      /** Uses {price} and {days} placeholders. */
      billedAnnual: string;
      /** Uses {days} placeholder. */
      billedMonthly: string;
      features: string[];
      /** Uses {days} placeholder. */
      cta: string;
    };
    fineprint: string;
  };

  footer: {
    privacy: string;
    terms: string;
    support: string;
    appStore: string;
    /** Uses {year} placeholder. */
    copyright: string;
  };

  legal: {
    /** Uses {date} placeholder. */
    eyebrow: string;
  };
}

const en: Dictionary = {
  locale: "en",
  htmlLang: "en",

  nav: {
    features: "Features",
    howItWorks: "How it works",
    pricing: "Pricing",
  },

  hero: {
    eyebrow: "Now available for macOS & iPad",
    headlineLine1: "Build slides with",
    headlineEmphasis: "any AI model.",
    headlineLine3: "Edit with precision.",
    subhead:
      "SlideFlow connects Claude, Gemini, Groq, or Apple's on-device AI to a live Reveal.js canvas. Chat to create, then refine with a pixel-precise editor.",
    ctaPrimary: "Get on the App Store",
    ctaSecondary: "See how it works",
    fineprint:
      "Free chat tier · Pro from {price}/mo with {days}-day trial · macOS & iPadOS",
  },

  howItWorks: {
    sectionLabel: "How it works",
    titlePrefix: "From prompt to presentation,",
    titleEmphasis: "in minutes.",
    tagline:
      "A conversational loop that keeps you in control — AI writes, you direct.",
    steps: [
      {
        title: "Chat with AI",
        body: "Describe your deck. Choose from Claude, Gemini, Groq, or Apple's on-device model — and pick a local LLM if you need full privacy.",
      },
      {
        title: "Watch it build",
        body: "Slides appear live on a 1920×1080 Reveal.js canvas — no compile step, no refresh. Iterate with follow-up messages or direct edits.",
      },
      {
        title: "Export anywhere",
        body: "Ship as a Reveal.js web deck, render to MP4 with animations, flatten to PDF, or export every slide as PNG — in one click.",
      },
    ],
  },

  features: {
    sectionLabel: "Features",
    titlePrefix: "Everything you need to",
    titleEmphasis: "ship great slides.",
    tagline:
      "Native macOS and iPad app built for creators who want AI speed and designer control.",
    liveCanvas: {
      eyebrow: "Live Canvas",
      title: "See changes as they happen",
      body: "Every AI action renders instantly on a 1920×1080 Reveal.js canvas. No save button, no preview mode — just live HTML.",
    },
    aiProviders: {
      eyebrow: "5 AI Providers",
      title: "Your model, your choice",
      body: "Anthropic, Gemini, Groq, OpenAI, or Apple Intelligence on-device — swap any time, mid-session.",
      onDevice: "On-device",
    },
    mcp: {
      eyebrow: "MCP Integration",
      title: "Deck-as-API",
      body: "An in-process MCP server exposes your full deck to Claude Desktop, CLI tools, and custom workflows — same DB, live sync.",
    },
    richExport: {
      eyebrow: "Rich Export",
      title: "Ship in any format",
      body: "Reveal.js web decks with full animations, MP4 video rendered frame-by-frame, PDF via Playwright, and PNG per-slide.",
    },
  },

  showcase: {
    sectionLabel: "Designed for craft",
    titlePrefix: "Native chrome.",
    titleEmphasis: "Native speed.",
    tagline:
      "Built with SwiftUI for macOS and iPad. Every pixel honors the platform — and adapts to your theme.",
    commandPalette: {
      eyebrow: "Command Palette",
      titlePrefix: "Every action,",
      titleEmphasis: "one keystroke away.",
      body: "Hit ⌘K to summon the palette. Create decks, run presentations, toggle the chat drawer, or jump to any slide — without lifting your hands from the keyboard.",
      shortcuts: [
        { label: "New Deck", key: "⌘N" },
        { label: "Run Presentation", key: "⌘R" },
        { label: "Toggle Chat", key: "⌘⌥A" },
        { label: "Chat with AI", key: "⌘⌥C" },
      ],
    },
    byok: {
      eyebrow: "Bring your own keys",
      titlePrefix: "Your keys.",
      titleEmphasis: "Your data.",
      body: "SlideFlow connects directly to each provider's API. Your prompts and slides never pass through our servers — and Apple Intelligence runs fully on-device.",
      bullets: [
        "API keys stored in macOS / iPad Keychain",
        "Direct connections — no proxy in between",
        "On-device option for offline work",
        "iCloud sync keeps decks private to you",
      ],
    },
    lightDark: {
      eyebrow: "Light & Dark",
      titlePrefix: "Beautiful in any",
      titleEmphasis: "mode.",
      body: "Two carefully tuned themes follow your system preference — or pick the one that fits the room.",
      darkLabel: "Dark",
      lightLabel: "Light",
    },
  },

  pricing: {
    sectionLabel: "Pricing",
    titlePrefix: "Try it free.",
    titleEmphasis: "Upgrade when ready.",
    tagline:
      "Chat is free forever. Pay only when you want the pixel-precise editor.",
    monthly: "Monthly",
    annual: "Annual",
    save: "Save {n}%",
    free: {
      tag: "Free",
      forever: "/ forever",
      note: "No credit card required.",
      features: [
        "Full AI chat experience",
        "All 5 AI providers (Anthropic, Gemini, Groq, OpenAI, Apple Intelligence)",
        "Unlimited decks & slides",
        "PNG export per slide",
        "MCP server access",
        "Community support",
      ],
      cta: "Get on the App Store",
    },
    pro: {
      tag: "Pro",
      perMonth: "/ mo",
      billedAnnual: "Billed as {price}/yr — {days}-day free trial.",
      billedMonthly: "Billed monthly — {days}-day free trial.",
      features: [
        "Everything in Free",
        "Direct property editor",
        "AI-driven element refinement",
        "AI chip suggestions",
        "MP4 & PDF export",
        "Priority support",
      ],
      cta: "Start {days}-Day Free Trial",
    },
    fineprint:
      "Distributed via the App Store on macOS & iPadOS · Subscription managed by Apple · Cancel any time",
  },

  footer: {
    privacy: "Privacy",
    terms: "Terms",
    support: "Support",
    appStore: "App Store",
    copyright: "© {year} SlideFlow. All rights reserved.",
  },

  legal: {
    eyebrow: "Legal · Last updated {date}",
  },
};

const zh: Dictionary = {
  locale: "zh",
  htmlLang: "zh-Hans",

  nav: {
    features: "功能",
    howItWorks: "工作流程",
    pricing: "价格",
  },

  hero: {
    eyebrow: "现已支持 macOS 与 iPad",
    headlineLine1: "用",
    headlineEmphasis: "任意 AI 模型",
    headlineLine3: "创作精美幻灯片",
    subhead:
      "SlideFlow 把 Claude、Gemini、Groq 和 Apple 端侧智能直连到实时 Reveal.js 画布。对话式生成，逐像素精修。",
    ctaPrimary: "前往 App Store",
    ctaSecondary: "了解工作流程",
    fineprint:
      "免费对话档 · Pro 起价 {price}/月，{days} 天试用 · macOS 与 iPadOS",
  },

  howItWorks: {
    sectionLabel: "工作流程",
    titlePrefix: "从提示到演示,",
    titleEmphasis: "几分钟搞定。",
    tagline: "对话式循环让你掌控全局——AI 创作,你来导演。",
    steps: [
      {
        title: "与 AI 对话",
        body: "描述你想要的幻灯片。在 Claude、Gemini、Groq、Apple 端侧模型间任你挑选——需要绝对隐私时还可选择本地 LLM。",
      },
      {
        title: "实时构建",
        body: "幻灯片在 1920×1080 的 Reveal.js 画布上即时呈现——无需编译,无需刷新。继续追问或直接编辑,层层打磨。",
      },
      {
        title: "随心导出",
        body: "一键导出 Reveal.js 网页版、带动画的 MP4 视频、平面 PDF,或将每页输出为 PNG 图片。",
      },
    ],
  },

  features: {
    sectionLabel: "功能特性",
    titlePrefix: "做好幻灯片",
    titleEmphasis: "所需的一切。",
    tagline:
      "为追求 AI 速度与设计师般精度的创作者打造的 macOS 与 iPad 原生应用。",
    liveCanvas: {
      eyebrow: "实时画布",
      title: "所见即所改",
      body: "每一次 AI 操作都即时呈现在 1920×1080 的 Reveal.js 画布上。无需保存按钮,无需预览模式——只有实时 HTML。",
    },
    aiProviders: {
      eyebrow: "5 个 AI 供应商",
      title: "模型自选",
      body: "Anthropic、Gemini、Groq、OpenAI 或端侧 Apple 智能——会话进行中也能随时切换。",
      onDevice: "端侧",
    },
    mcp: {
      eyebrow: "MCP 集成",
      title: "幻灯片即 API",
      body: "进程内 MCP 服务器将整套幻灯片暴露给 Claude Desktop、CLI 工具与自定义工作流——共享同一数据库,实时同步。",
    },
    richExport: {
      eyebrow: "丰富导出",
      title: "想要什么格式都行",
      body: "完整动画的 Reveal.js 网页版、逐帧渲染的 MP4 视频、Playwright 生成的 PDF,以及单页 PNG。",
    },
  },

  showcase: {
    sectionLabel: "为打磨而生",
    titlePrefix: "原生外观,",
    titleEmphasis: "原生速度。",
    tagline:
      "用 SwiftUI 为 macOS 与 iPad 原生构建。每个像素都尊重平台——并随你的主题自适应。",
    commandPalette: {
      eyebrow: "命令面板",
      titlePrefix: "所有操作,",
      titleEmphasis: "一键即达。",
      body: "按 ⌘K 唤起命令面板。新建幻灯片、运行演示、切换聊天抽屉、跳转到任意一页——双手不必离开键盘。",
      shortcuts: [
        { label: "新建幻灯片", key: "⌘N" },
        { label: "运行演示", key: "⌘R" },
        { label: "切换聊天", key: "⌘⌥A" },
        { label: "唤起 AI", key: "⌘⌥C" },
      ],
    },
    byok: {
      eyebrow: "直连不中转",
      titlePrefix: "你的密钥,",
      titleEmphasis: "你的数据。",
      body: "SlideFlow 直连每家 AI 供应商的 API,提示词和幻灯片不会经过我们的服务器——Apple 智能更是全程留在你的设备上。",
      bullets: [
        "API 密钥保存在 macOS / iPad 钥匙串里",
        "直连模型供应商,中间没有任何代理",
        "可切换为端侧运行,离线也能用",
        "iCloud 同步只在你自己的账号内流转",
      ],
    },
    lightDark: {
      eyebrow: "明暗主题",
      titlePrefix: "明暗皆美,",
      titleEmphasis: "尽显从容。",
      body: "两套精心调校的主题随系统偏好切换——也可手动选择更衬当下场景的那一种。",
      darkLabel: "深色",
      lightLabel: "浅色",
    },
  },

  pricing: {
    sectionLabel: "价格",
    titlePrefix: "免费体验。",
    titleEmphasis: "随时升级。",
    tagline: "对话功能永久免费。仅在需要像素级编辑器时再付费。",
    monthly: "按月",
    annual: "按年",
    save: "省 {n}%",
    free: {
      tag: "免费版",
      forever: " / 永久",
      note: "无需信用卡。",
      features: [
        "完整 AI 对话体验",
        "全部 5 个 AI 供应商(Anthropic、Gemini、Groq、OpenAI、Apple 智能)",
        "无限幻灯片",
        "单页 PNG 导出",
        "MCP 服务器访问",
        "社区支持",
      ],
      cta: "前往 App Store",
    },
    pro: {
      tag: "Pro",
      perMonth: " / 月",
      billedAnnual: "按年计费 {price},{days} 天免费试用。",
      billedMonthly: "按月计费,{days} 天免费试用。",
      features: [
        "包含免费版全部功能",
        "直接属性编辑器",
        "AI 驱动的元素精修",
        "AI 建议小卡",
        "MP4 与 PDF 导出",
        "优先支持",
      ],
      cta: "开始 {days} 天免费试用",
    },
    fineprint:
      "通过 App Store 在 macOS 与 iPadOS 分发 · 订阅由 Apple 管理 · 随时取消",
  },

  footer: {
    privacy: "隐私政策",
    terms: "服务条款",
    support: "支持",
    appStore: "App Store",
    copyright: "© {year} SlideFlow 版权所有。",
  },

  legal: {
    eyebrow: "法律 · 最后更新于 {date}",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, zh };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
