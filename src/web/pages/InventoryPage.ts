import { type Locator, type Page } from '@playwright/test';
import { Header } from '@components/Header';

export class InventoryPage {
    readonly page: Page;
    readonly header: Header;
    readonly inventoryList: Locator;
    readonly inventoryItems: Locator;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
        this.inventoryList = page.locator('.inventory_list');
        this.inventoryItems = page.locator('.inventory_item');
        this.pageTitle = page.locator('.title');
    }

    async goto() {
        await this.page.goto('/inventory.html');
    }

    async addItemToCart(productName: string) {
        await this.page.locator('.inventory_item')
            .filter({ hasText: productName })
            .getByRole('button', { name: 'Add to cart' })
            .click();
    }
}
