import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

export default defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: 1,
    /* Global Timeout */
    timeout: 60000,
    /* Global Setup and Teardown */
    globalSetup: './src/config/globalSetup.ts',
    globalTeardown: './src/config/globalTeardown.ts',

    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        //['list', { printSteps: true }],
        ['./src/reporters/CustomReporter.ts'],
        ['html', { open: 'never' }],
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        baseURL: process.env.BASE_URL,
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'api',
            testDir: './tests/api',
            use: {
                baseURL: process.env.API_BASE_URL,
            },
        },
        {
            name: 'chromium',
            testIgnore: /.*tests\/api.*/,
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
