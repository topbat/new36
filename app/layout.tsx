import type { Metadata } from "next";
import type { ReactNode } from "react";

import "../tokens.css";
import "../src/styles.css";

export const metadata: Metadata = {
  title: "AI 三十六计互动文化馆",
  description: "通过六卷展馆、漫画分镜、哲学拆解和情境训练，理解三十六计的机制、边界与反制。",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/maskable-icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
