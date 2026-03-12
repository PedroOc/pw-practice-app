import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';
import { link } from 'fs';

require('dotenv').config()

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({

  retries: 1,
  reporter:[
    ['list'],
    // ['json', { outputFile: 'test-results/test-results.json' }],
    ['junit', { outputFile: 'test-results/test-results.xml' }],
    // ["allure-playwright"]
    ['html']
  ],
  use: {
    globalQAUrl:'https://globalsqa.com/demo-site/draganddrop/',

    baseURL: process.env.DEV === '1' ? 'http://localhost:4200/' 
          : process.env.STAGING === '1' ? 'http://localhost:4300/' 
          : 'http://localhost:4200/',
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'dev',
      use: { ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/',
        globalQAUrl:'https://globalsqa.com/demo-site/draganddrop/',
      },      
    },
    {
      name: 'chromium',
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
    {
      name: 'mobile',
      testMatch: 'tests/testMobile.spec.ts',
      use: { ...devices['iPhone 13 Pro'] },
    }
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/',
    // If a server is already running (we start it in the container), reuse it
    reuseExistingServer: true,
  },
});
