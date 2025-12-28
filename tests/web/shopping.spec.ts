import { test, expect } from '@src/fixtures/baseTest';

test.describe('Shopping Flow Architecture Check', () => {

    test('Add item to cart using Page Object Composition', async ({ inventoryPage, page, logger }) => {
        logger.info('Navigating to Swag Labs');
        await page.goto('https://www.saucedemo.com/');

        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        logger.info('Verifying Inventory Page Title');
        await expect(inventoryPage.pageTitle).toHaveText('Products');

        logger.info('Adding Sauce Labs Backpack to cart');
        await inventoryPage.addItemToCart('Sauce Labs Backpack');

        logger.info('Checking Cart Badge via Header Component');
        const count = await inventoryPage.header.getCartCount();
        expect(count, 'Cart count should be 1').toBe(1);

        logger.info('Opening Cart via Header Component');
        await inventoryPage.header.openCart();

        await expect(page).toHaveURL(/.*cart.html/);
    });
});
