import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [
    react(),
    UnoCSS({
      hmrTopLevelAwait: false,
    }),
  ],
  build: {
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [
            { name: "vendor", test: /\/react(?:-dom)?/ },
            { name: "antd", test: /\/ant(?:-dom)?/ },
          ],
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
