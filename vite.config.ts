import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon.svg", "maskable-icon.svg"],
      manifest: {
        name: "三十六计互动文化馆",
        short_name: "三十六计",
        description: "面向学生、大众读者与职场学习者的本地优先互动文化馆",
        lang: "zh-CN",
        start_url: "/",
        display: "standalone",
        background_color: "#f3eee3",
        theme_color: "#2c211b",
        icons: [
          { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
          { src: "/maskable-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
        ],
      },
      workbox: { navigateFallback: "/index.html", cleanupOutdatedCaches: true },
    }),
  ],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
  },
});
