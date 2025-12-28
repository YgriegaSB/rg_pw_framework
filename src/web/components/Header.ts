import { type Locator, type Page } from '@playwright/test';

export class Header {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly menuButton: Locator;
    readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.locator('.shopping_cart_link');
        this.menuButton = page.getByRole('button', { name: 'Open Menu' });
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    }

    async openCart() {
        await this.cartLink.click();
    }

    async openMenu() {
        await this.menuButton.click();
    }

    async getCartCount(): Promise<number> {
        if (await this.shoppingCartBadge.isVisible()) {
            const count = await this.shoppingCartBadge.innerText();
            return parseInt(count, 10);
        }
        return 0;
    }
}
