import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "next/image": path.resolve(__dirname, "__mocks__/next-image.tsx"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.tsx"],
    include: ["components/**/*.test.{ts,tsx}", "lib/**/*.test.{ts,tsx}"],
    css: false,
    pool: "threads",
  },
});
