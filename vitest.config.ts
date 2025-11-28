import { defineConfig } from "vitest/config";
import { coverageConfigDefaults } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // Simulates a browser environment
    globals: true, // Enables global test functions like `describe` and `it`
    setupFiles: "./vitest.setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/modules/**/*.{ts,tsx,js,jsx}"],
      exclude: [
        "**/docs/**",
        "**/index.{ts,tsx,js,jsx}",
        "**/*.types.{ts,tsx,js,jsx}",
        "**/*.constants.{ts,tsx,js,jsx}",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
