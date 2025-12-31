import { type Locator, type Page } from '@playwright/test';

export class ReportDetailsPage {
    readonly page: Page;

    readonly mainModuleTitle: Locator;
    readonly currentModuleTitle: Locator;

    readonly editButton: Locator;
    readonly sendReportButton: Locator;
    readonly buttonAddBills: Locator;
    readonly detailsBills: Locator;

    constructor(page: Page) {
        this.page = page;

        this.mainModuleTitle = page.locator("//div[@class='leftSection']/child::a[text()='Informes']");
        this.currentModuleTitle = page.locator("//a[text()='Detalle del Informe']");

        this.editButton = page.locator("//button/span[text()='Editar']");
        this.sendReportButton = page.locator("//button/span[text()='Enviar informe']");
        this.buttonAddBills = page.locator("//button/span[text()='+ Agregar más gastos']");
        this.detailsBills = page.locator("//span[text()='Gastos']");
    }

    // --- Actions ---

    async clickEdit() {
        await this.editButton.click();
    }

    async clickSendReport() {
        await this.sendReportButton.click();
    }

    async clickAddBills() {
        await this.buttonAddBills.click();
    }

    async clickMainModuleTitle() {
        await this.mainModuleTitle.click();
    }

    // --- Grid Interaction ---
    getRowByName(expenseName: string): Locator {
        return this.page.locator(
            `xpath=//div[contains(@class, "gridItem") and contains(@class, "unselectableUser")][.//span[contains(@class, "bold") and contains(text(), "${expenseName}")]]`
        );
    }

    async getExpenseData(row: Locator) {
        await row.waitFor();

        const getTextSafe = async (locator: Locator) => {
            try {
                return (await locator.innerText({ timeout: 200 })).trim();
            } catch (e) {
                return '';
            }
        };

        const nameLocator = row.locator('xpath=.//div[contains(@class, "truncate")]//span[contains(@class, "bold")]');
        const dateLocator = row.locator('xpath=.//div[contains(@class, "truncate")]//span[contains(@class, "small")]');

        const statusLocator = row.locator('xpath=.//div[contains(@class, "chipGroup")]//span');
        const categoryLocator = row.locator('xpath=.//div[contains(@class, "gridCol sp5")][2]//span'); // The second sp5 column is typically category based on header structure, but waiting on HTML confirmation. Based on provided HTML: <div class="gridCol sp5"><span class="asbestos... calcory??">

        const categoryLocatorFixed = row.locator('xpath=(.//div[contains(@class, "gridCol sp5")])[2]//span');
        const totalLocator = row.locator('xpath=.//div[contains(@class, "right")]//div[contains(@class, "text-blue")]');

        return {
            name: await getTextSafe(nameLocator),
            date: await getTextSafe(dateLocator),
            status: await getTextSafe(statusLocator),
            category: await getTextSafe(categoryLocatorFixed),
            total: await getTextSafe(totalLocator),
        };
    }

    async getExpenseDataByName(name: string) {
        const row = this.getRowByName(name);
        return await this.getExpenseData(row);
    }
}
