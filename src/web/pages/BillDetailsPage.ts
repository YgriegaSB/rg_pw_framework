import { type Locator, type Page } from '@playwright/test';

export class BillDetailsPage {
    readonly page: Page;

    readonly principalModule: Locator;
    readonly currentModuleTitle: Locator;
    readonly date: Locator;
    readonly amount: Locator;
    readonly category: Locator;
    readonly rutProvider: Locator;
    readonly documentType: Locator;
    readonly documentNumber: Locator;
    readonly notes: Locator;
    readonly buttonDeleteBill: Locator;
    readonly buttonEditBill: Locator;

    constructor(page: Page) {
        this.page = page;

        this.principalModule = page.locator("//div[@class='top-menu']/descendant::div[text()='Gastos']");
        this.currentModuleTitle = page.locator("//div[@class='nav current']");
        this.date = page.locator("//app-editable-info//div[contains(@class, 'editableValue') and not(contains(@class, 'bigger'))]//div[contains(@class, 'flex')]");
        this.amount = page.locator("//app-editable-info//div[contains(@class, 'editableValue') and contains(@class, 'bigger')]//div[contains(@class, 'flex')]");
        this.category = page.locator("(.//*[normalize-space()='Categoría']/following::div)[1]");
        this.rutProvider = page.locator("(.//*[normalize-space()='RUT Proveedor']/following::div)[1]");
        this.documentType = page.locator("(.//*[normalize-space()='Tipo de Documento']/following::div)[1]");
        this.documentNumber = page.locator("(.//*[normalize-space()='Número de Documento']/following::div)[1]");
        this.notes = page.locator('//div[@class="section"]/div');
        this.buttonDeleteBill = page.locator("//span[normalize-space()='Eliminar gasto']/parent::button");
        this.buttonEditBill = page.locator("//span[normalize-space()='Editar gasto']/parent::button");
    }

    // --- Actions ---

    async clickPrincipalModule() {
        await this.principalModule.click();
    }

    async clickDeleteBill() {
        await this.buttonDeleteBill.click();
    }

    async clickEditBill() {
        await this.buttonEditBill.click();
    }

    // --- Get Text Utilities ---

    async getCurrentModuleTitleText(): Promise<string> {
        return (await this.currentModuleTitle.innerText()).trim();
    }

    async getDateText(): Promise<string> {
        return (await this.date.innerText()).trim();
    }

    async getAmountText(): Promise<string> {
        return (await this.amount.innerText()).trim();
    }

    async getCategoryText(): Promise<string> {
        return (await this.category.innerText()).trim();
    }

    async getRutProviderText(): Promise<string> {
        return (await this.rutProvider.innerText()).trim();
    }

    async getDocumentTypeText(): Promise<string> {
        return (await this.documentType.innerText()).trim();
    }

    async getDocumentNumberText(): Promise<string> {
        return (await this.documentNumber.innerText()).trim();
    }

    async getNotesText(): Promise<string> {
        return (await this.notes.innerText()).trim();
    }
}
