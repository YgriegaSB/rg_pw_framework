import { test, expect } from '@src/fixtures/baseTest';

test.describe('Shopping Flow Architecture Check', () => {

    test('Add item to cart using Page Object Composition', async ({ inventoryPage, page, logger }) => {
        // Precondition: User is logged in (Mocking login for this architectural test or using a login helper)
        // Since we didn't implement Login page in this slice, we will mock the state or assume a bypass for this demo.
        // For Swag Labs, we usually need to login properly. 
        // Let's implement a quick login bypass or just standard login if simple.
        // Assuming we are at login page:
        logger.info('Navigating to Swag Labs');
        await page.goto('https://www.saucedemo.com/');

        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        // NOW we are at Inventory Page
        logger.info('Verifying Inventory Page Title');
        await expect(inventoryPage.pageTitle).toHaveText('Products');

        // Interaction: Add Item
        logger.info('Adding Sauce Labs Backpack to cart');
        await inventoryPage.addItemToCart('Sauce Labs Backpack');

        // Composition Access: Check Header Badge
        logger.info('Checking Cart Badge via Header Component');
        const count = await inventoryPage.header.getCartCount();
        expect(count, 'Cart count should be 1').toBe(1);

        // Composition Access: Open Cart
        logger.info('Opening Cart via Header Component');
        await inventoryPage.header.openCart();

        await expect(page).toHaveURL(/.*cart.html/);
    });
});
