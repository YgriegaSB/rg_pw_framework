import { type Locator, type Page } from '@playwright/test';

export class SnackBar {
    readonly page: Page;
    readonly container: Locator;

    constructor(page: Page) {
        this.page = page;
        this.container = page.locator('div.snackBar');
    }

    async getMessage(): Promise<string> {
        await this.container.first().waitFor({ state: 'visible' });
        return await this.container.first().innerText();
    }

    async waitForSuccess() {
        await this.container.filter({ hasNotText: 'Error' }).first().waitFor({ state: 'visible' });
    }

    async waitForVisible() {
        await this.container.first().waitFor({ state: 'visible' });
    }
}
