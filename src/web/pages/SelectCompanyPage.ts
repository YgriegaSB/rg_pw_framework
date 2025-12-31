import { type Locator, type Page } from '@playwright/test';

export class SelectCompanyPage {
    readonly page: Page;
    readonly cards: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cards = page.locator('#cardContainer > div');
        this.logoutButton = page.locator('#undefined');
    }

    async selectCompany(companyName: string) {
        const companyCard = this.cards.filter({ hasText: companyName });
        await companyCard.click();
    }

    async clickLogout() {
        await this.logoutButton.click();
    }
}
