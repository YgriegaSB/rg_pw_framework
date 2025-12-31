import { type Locator, type Page } from '@playwright/test';

export class NewReportModal {
    readonly page: Page;

    readonly modalTitle: Locator;
    readonly dropdownPolicy: Locator;
    readonly inputTitleReport: Locator;
    readonly buttonCancel: Locator;
    readonly buttonCreateReportModal: Locator;

    constructor(page: Page) {
        this.page = page;

        this.modalTitle = page.locator("//div[text()=' Nuevo informe ']");
        this.dropdownPolicy = page.locator("//div[@class='input-container br-8']");
        this.inputTitleReport = page.locator("//div[@class='input-container wp-50 br-8']/child::input");
        this.buttonCancel = page.locator("//span[text()='Cancelar']/parent::button");
        this.buttonCreateReportModal = page.locator("//btn-component[@id='modal-new-report-create-report']//button");
    }

    async selectPolicy(index: number = 0) {
        await this.dropdownPolicy.click();
        const option = this.page.locator(`(//ng-dropdown-panel//div[contains(@class, 'ng-option')])[${index + 1}]`);
        // Ensure the dropdown is open and option is visible before clicking
        await option.waitFor();
        await option.click();
    }

    async fillTitle(title: string) {
        await this.inputTitleReport.fill(title);
    }

    async clickCreateReport() {
        await this.buttonCreateReportModal.click();
    }

    async clickCancel() {
        await this.buttonCancel.click();
    }
}
