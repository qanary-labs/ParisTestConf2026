// @ts-check
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 3_000,
  reporter: [
    ["list"],
    ["html", { open: "never" }],
  ],
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on",
    screenshot: "on",
    video: "on",
  },
  webServer: {
    command: "npm start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: true,
  },
});
