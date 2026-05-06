import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SlideFlow — AI-authored presentations for Mac & iPad",
  description:
    "Chat with Claude, Gemini, Groq, or Apple's on-device AI to build beautiful Reveal.js presentations on a live canvas. Export to web, MP4, PDF, or PNG.",
  openGraph: {
    title: "SlideFlow — AI-authored presentations for Mac & iPad",
    description:
      "Build presentations with AI. Edit with precision. Export anywhere.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SlideFlow — AI-authored presentations",
    description:
      "Chat with AI to build Reveal.js presentations on a live canvas.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg-base text-text-primary font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
