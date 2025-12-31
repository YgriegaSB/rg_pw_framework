import { type Locator, type Page } from '@playwright/test';

export class NotificationModal {
    readonly page: Page;
    readonly container: Locator;

    constructor(page: Page) {
        this.page = page;
        this.container = page.locator('.flex.ai-c.fd-c.pd-40-tb.pd-32-sides.ng-star-inserted');
    }
}
