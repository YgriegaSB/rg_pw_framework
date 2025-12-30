import { test, expect } from '@src/fixtures/baseTest';

test.describe('Shopping Flow Architecture Check', () => {

    test('Add item to cart', async ({ inventoryPage, page, logger }) => {

        await test.step('Login to Swag Labs', async () => {
            logger.info('Navigating to Swag Labs');
            await page.goto('https://www.saucedemo.com/');

            await page.fill('[data-test="username"]', 'standard_user');
            await page.fill('[data-test="password"]', 'secret_sauce');
            await page.click('[data-test="login-button"]');
        });

        await test.step('Verify Inventory Page', async () => {
            logger.info('Verifying Inventory Page Title');
            await expect(inventoryPage.pageTitle).toHaveText('Products');
        });

        await test.step('Add Item to Cart', async () => {
            logger.info('Adding Sauce Labs Backpack to cart');
            await inventoryPage.addItemToCart('Sauce Labs Backpack');
        });

        await test.step('Verify Cart Badge', async () => {
            logger.info('Checking Cart Badge via Header Component');
            const count = await inventoryPage.header.getCartCount();
            expect(count, 'Cart count should be 1').toBe(1);
        });

        await test.step('Open Cart and Verify URL', async () => {
            logger.info('Opening Cart via Header Component');
            await inventoryPage.header.openCart();

            await expect(page).toHaveURL(/.*cart.html/);
        });
    });
});
