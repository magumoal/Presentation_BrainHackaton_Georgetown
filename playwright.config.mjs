import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    headless: true,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium', viewport: { width: 1600, height: 900 } },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit', viewport: { width: 1600, height: 900 } },
    },
  ],
  reporter: [['list']],
});

