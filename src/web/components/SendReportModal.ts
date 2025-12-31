import { type Locator, type Page } from '@playwright/test';

export class SendReportModal {
    readonly page: Page;

    readonly title: Locator;
    readonly buttonSendReport: Locator;
    readonly buttonCancel: Locator;

    constructor(page: Page) {
        this.page = page;

        this.title = page.locator('//div[text()="Enviar informe"]');
        this.buttonSendReport = page.locator("//btn-component[@id='modal-send-report-send']//button");
        this.buttonCancel = page.locator("//btn-component[@id='modal-send-report-cancel']//button");
    }

    async clickSendReport() {
        await this.buttonSendReport.click();
    }

    async clickCancel() {
        await this.buttonCancel.click();
    }
}
