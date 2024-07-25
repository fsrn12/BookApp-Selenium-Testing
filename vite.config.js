import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [],
  test: {
    include: [
      "src/**/*.test.{js,jsx,ts,tsx}",
      "src/__tests__/*.test.{js,jsx,ts,tsx}",
    ],
    // setupFiles: [path.resolve(__dirname, "src/setup.js")],
    // passWithNoTests: true,
    // environment: "jsdom",
    // coverage: {
    //   reporter: ["text", "json", "html"],
    // },
  },
});
