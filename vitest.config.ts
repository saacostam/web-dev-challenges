import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // Simulates a browser environment
    globals: true, // Enables global test functions like `describe` and `it`
    // setupFiles: './vitest.setup.ts',
  },
});
