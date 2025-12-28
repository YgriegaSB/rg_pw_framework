import { test, expect } from '@src/fixtures/baseTest';

test('has title', async ({ page, logger }) => {
    logger.info('Navigating to Playwright homepage');
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    logger.info('Verifying page title');
    await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page, logger }) => {
    logger.info('Navigating to Playwright homepage');
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    logger.info('Clicking "Get started" link');
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    logger.info('Verifying "Installation" heading visibility');
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
