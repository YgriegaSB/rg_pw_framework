import { type Locator, type Page } from '@playwright/test';

export class BillsPage {
    readonly page: Page;

    readonly currentModule: Locator;
    readonly buttonNewBill: Locator;
    readonly buttonOptions: Locator;
    readonly buttonOptionsOptionExportBills: Locator;
    readonly buttonOptionsOptionDeleteDrafts: Locator;

    readonly title: Locator;
    readonly searchInput: Locator;
    readonly buttonFilter: Locator;
    readonly updateBillsButton: Locator;

    readonly gridColumns: Locator;
    readonly buttonStopScanit: Locator;

    constructor(page: Page) {
        this.page = page;

        this.currentModule = page.locator('div.nav.current');
        this.buttonNewBill = page.locator('//button/span[text()="Crear gasto"]');
        this.buttonOptions = page.locator('#optionsButton');
        this.buttonOptionsOptionExportBills = page.getByText('Exportar gastos');
        this.buttonOptionsOptionDeleteDrafts = page.getByText('Eliminar borradores');

        this.title = page.locator('//div[@class="header-1"]');
        this.searchInput = page.locator('input[placeholder="Ej: Rindegastos SPA"]');
        this.buttonFilter = page.locator('#filterOrigin');
        this.updateBillsButton = page.locator('//div[contains(@class, "pointer") and contains(@class, "br-100")]');
        this.gridColumns = page.locator('//div[@class="gridItem head mg-24-t"]');
        this.buttonStopScanit = page.locator("//button[normalize-space()='Detener Scanit']");
    }


    async getTitleText(): Promise<string> {
        return await this.title.innerText();
    }

    async clickNewBill() {
        await this.buttonNewBill.click();
    }

    async searchBill(query: string) {
        await this.searchInput.fill(query);
        await this.searchInput.press('Enter');
    }

    async clickFilter() {
        await this.buttonFilter.click();
    }

    async clickUpdateBills() {
        await this.updateBillsButton.click();
    }

    async openGlobalOptions() {
        await this.buttonOptions.click();
    }

    async exportBills() {
        await this.openGlobalOptions();
        await this.buttonOptionsOptionExportBills.click();
    }

    async deleteDrafts() {
        await this.openGlobalOptions();
        await this.buttonOptionsOptionDeleteDrafts.click();
    }

    // -- Get Row by bill Name --
    getRowByName(name: string): Locator {
        return this.page.locator(`xpath=//div[contains(@class, "gridItem")][.//div[contains(@class, "textCheck")]//span[contains(@class, "bold") and normalize-space()="${name}"]]`);
    }

    // --- Row Data Extraction ---
    async getBillData(row: Locator) {
        await row.waitFor();

        const getTextSafe = async (locator: Locator) => {
            try {
                return await locator.innerText({ timeout: 200 });
            } catch (e) {
                return '';
            }
        };

        const nameLocator = row.locator('xpath=.//div[contains(@class, "textCheck")]//span[contains(@class, "bold")]');
        const dateLocator = row.locator('xpath=.//div[contains(@class, "textCheck")]//div[contains(@class, "asbestos")]');
        const statusLocator = row.locator('xpath=.//div[contains(@class, "chipGroup")]//span');

        const policyLocator = row.locator('xpath=(.//a[contains(@class, "sp3")])[2]//span');
        const categoryLocator = row.locator('xpath=(.//a[contains(@class, "sp3")])[3]//span');

        const totalLocator = row.locator('xpath=.//a[contains(@class, "right")]//span');

        const duplicateIcon = row.locator('xpath=.//icons-component[@type="duplyList"]');
        const isDuplicate = await duplicateIcon.count() > 0;

        return {
            name: await getTextSafe(nameLocator),
            date: await getTextSafe(dateLocator),
            status: await getTextSafe(statusLocator),
            policy: await getTextSafe(policyLocator),
            category: await getTextSafe(categoryLocator),
            total: await getTextSafe(totalLocator),
            isDuplicate
        };
    }

    async getBillDataByName(name: string) {
        const row = this.getRowByName(name);
        return this.getBillData(row);
    }

    // -- Row Menu Actions --
    async openRowMenu(row: Locator) {
        const menuButton = row.locator('xpath=.//div[contains(@class, "endListMenu")]');
        await menuButton.click();
    }

    async selectMenuOption(optionText: string) {
        await this.page.locator(`xpath=.//div[contains(@class, "dropDown")]//div[contains(text(), "${optionText}")]`).click();
    }

    async openRowMenuByName(name: string) {
        const row = this.getRowByName(name);
        await this.openRowMenu(row);
    }

    async editBillByName(name: string) {
        await this.openRowMenuByName(name);
        await this.selectMenuOption('Editar gasto');
    }

    async copyBillByName(name: string) {
        await this.openRowMenuByName(name);
        await this.selectMenuOption('Copiar gasto');
    }

    async deleteBillByName(name: string) {
        await this.openRowMenuByName(name);
        await this.selectMenuOption('Eliminar gasto');
    }

    // -- Scanit Process Actions --
    async stopScanitProcess(index: number = 0) {
        await this.buttonStopScanit.nth(index).click();
    }

    async stopAllScanitProcesses() {
        let count = await this.buttonStopScanit.count();
        while (count > 0) {
            await this.buttonStopScanit.first().click();
            await this.page.waitForTimeout(300);
            count = await this.buttonStopScanit.count();
        }
    }
}