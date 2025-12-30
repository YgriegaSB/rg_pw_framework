import { type Locator, type Page } from '@playwright/test';

export class Sidebar {
    readonly page: Page;
    readonly userRole: Locator;
    readonly billsButton: Locator;
    readonly reportsButton: Locator;
    readonly fundsButton: Locator;
    readonly viaticosButton: Locator;
    readonly conciliationButton: Locator;
    readonly galleryButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userRole = page.locator('//span[text()="Rendidor"]');
        this.billsButton = page.locator('#employee');
        this.reportsButton = page.locator('#reports-employee');
        this.fundsButton = page.locator('#funds-employee');
        this.viaticosButton = page.getByRole('link', { name: 'Viáticos' });
        this.conciliationButton = page.getByRole('link', { name: 'Concil-IA' });
        this.galleryButton = page.getByRole('link', { name: 'Galería' });
    }

    async getUserRole(): Promise<string | null> {
        return this.userRole.textContent();
    }

    async clickBills() {
        await this.billsButton.click();
    }

    async clickReports() {
        await this.reportsButton.click();
    }

    async clickFunds() {
        await this.fundsButton.click();
    }

    async clickViaticos() {
        await this.viaticosButton.click();
    }

    async clickConciliation() {
        await this.conciliationButton.click();
    }

    async clickGallery() {
        await this.galleryButton.click();
    }
}