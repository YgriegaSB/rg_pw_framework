import { type Locator, type Page } from '@playwright/test';

export class ReportsPage {
    readonly page: Page;

    // Header & Actions
    readonly titleModule: Locator;
    readonly buttonCreateReport: Locator;
    readonly optionsMenu: Locator;
    readonly menuOptionExportReports: Locator;
    readonly menuOptionDeleteDrafts: Locator;

    // Module Navigation
    readonly moduleReports: Locator;
    readonly moduleReportsDrafts: Locator;

    constructor(page: Page) {
        this.page = page;

        this.titleModule = page.locator("//div[@class='top-menu']/descendant::div[text()='Informes']");
        this.buttonCreateReport = page.locator("//button/span[text()='Crear informe']");
        this.optionsMenu = page.locator("//button[@id='optionsButton']");

        this.menuOptionExportReports = page.locator("//div[contains(@class, 'hovFilter')]");
        this.menuOptionDeleteDrafts = page.locator("//span[contains(@class, 'hovFilter')]");

        this.moduleReports = page.locator("//div[text()=' Informes ']");
        this.moduleReportsDrafts = page.locator("//div[text()=' Informes en borrador ']");
    }

    // --- Actions ---

    async clickCreateReport() {
        await this.buttonCreateReport.click();
    }

    async clickModuleReports() {
        await this.moduleReports.click();
    }

    async clickModuleReportsDrafts() {
        await this.moduleReportsDrafts.click();
    }

    // --- Table Interaction ---

    // Get Row by Report Name
    getRowByName(name: string): Locator {
        return this.page.locator(`xpath=//div[contains(@class, 'gridItem') and .//div[contains(@class, 'date-text')]][.//span[contains(., "${name}")]]`);
    }

    // --- Row Data Extraction ---
    async getReportData(row: Locator) {
        await row.waitFor();

        const getTextSafe = async (locator: Locator) => {
            try {
                return (await locator.innerText({ timeout: 200 })).trim();
            } catch (e) {
                return '';
            }
        };

        const nameLocator = row.locator('xpath=.//div[contains(@class, "textCheck")]//span[contains(@class, "bold")]');
        const dateLocator = row.locator('xpath=.//div[contains(@class, "date-text")]');
        const statusLocator = row.locator('xpath=.//div[contains(@class, "chipGroup")]//span');

        const policyLocator = row.locator('xpath=(.//a[contains(@class, "sp3")])[1]//span');
        const expensesCountLocator = row.locator('xpath=(.//a[contains(@class, "sp3")])[2]');

        const amountApprovedLocator = row.locator('xpath=.//a[contains(@class, "right")]//span[contains(@class, "text-blue")]');
        const amountTotalLocator = row.locator('xpath=.//a[contains(@class, "right")]//div[contains(@class, "text-black")]');

        return {
            name: await getTextSafe(nameLocator),
            date: await getTextSafe(dateLocator),
            status: await getTextSafe(statusLocator),
            policy: await getTextSafe(policyLocator),
            expensesCount: await getTextSafe(expensesCountLocator),
            amountApproved: await getTextSafe(amountApprovedLocator),
            amountTotal: await getTextSafe(amountTotalLocator)
        };
    }

    async getReportDataByName(name: string) {
        const row = this.getRowByName(name);
        return this.getReportData(row);
    }

    // --- Row Menu Actions ---
    async openRowMenu(row: Locator) {
        const menuButton = row.locator('xpath=.//div[contains(@class, "endListMenu")]');
        await menuButton.click();
    }

    async selectMenuOption(optionText: string) {
        // Global locator for the dropdown option
        await this.page.locator(`xpath=//div[contains(@class, "dropDown")]//div[contains(text(), "${optionText}")]`).click();
    }

    async exportExcelByName(name: string) {
        await this.openRowMenu(this.getRowByName(name));
        await this.selectMenuOption('Exportar Excel');
    }

    async exportPDFByName(name: string) {
        await this.openRowMenu(this.getRowByName(name));
        await this.selectMenuOption('Exportar PDF');
    }
}
