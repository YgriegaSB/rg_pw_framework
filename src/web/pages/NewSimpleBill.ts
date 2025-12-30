import { type Locator, type Page } from '@playwright/test';

export class NewSimpleBill {
    readonly page: Page;

    // Header Elements
    readonly currentModule: Locator;
    readonly buttonSave: Locator;

    // Form Elements
    readonly formTitle: Locator;
    readonly dropdownPolicy: Locator;
    readonly inputMerchant: Locator;
    readonly inputBillDate: Locator;
    readonly inputAmount: Locator;
    readonly dropdownCurrency: Locator;
    readonly dropdownCategory: Locator;
    readonly inputRutProvider: Locator;
    readonly radioDocumentType: Locator;
    readonly inputDocumentNumber: Locator;
    readonly inputComment: Locator;

    // Form Actions
    readonly buttonCancel: Locator;
    readonly buttonContinue: Locator;

    // File Upload
    readonly fileContainer: Locator;
    readonly inputFile: Locator;
    readonly iconInputFileUpload: Locator;

    constructor(page: Page) {
        this.page = page;

        // Header
        this.currentModule = page.locator("//div[contains(@class, 'nav current') and contains(., 'Nuevo gasto')]");
        this.buttonSave = page.locator("//btn-component[@id='employee-save-expense']//button");

        // Form
        this.formTitle = page.locator("//div[contains(@class, 'title')]"); // Ajuste genérico si existe clase, si no usaremos el texto proporcionado en métodos de validación.
        this.dropdownPolicy = page.locator('#simple-policy-select');

        this.inputMerchant = page.locator('#merchant');
        this.inputBillDate = page.locator('#date');
        this.inputAmount = page.locator('#amount');
        this.dropdownCurrency = page.locator('#originalCurrencyCode');
        this.dropdownCategory = page.locator('#category');

        this.inputRutProvider = page.locator("//input[@id='RUT Proveedor']");

        this.radioDocumentType = page.locator("//input/parent::label");
        this.inputDocumentNumber = page.locator("//input[@id='Número de Documento']");
        this.inputComment = page.locator('#comment');

        this.buttonCancel = page.locator("//span[text()='Cancelar']/parent::button");
        this.buttonContinue = page.locator("//btn-component[@id='save-edit-expense']/button");

        this.fileContainer = page.locator('#multiExpense');
        this.inputFile = page.locator("//div[@id='multiExpense']/input");
        this.iconInputFileUpload = page.locator("//div[contains(@class, 'mat-mdc-tooltip-trigger')]//input[@type='file']");
    }

    // --- Actions ---

    async getFormTitle(): Promise<string> {
        return await this.formTitle.innerText();
    }

    async fillMerchant(merchant: string) {
        await this.inputMerchant.fill(merchant);
    }

    async selectDate(day: string) {
        await this.inputBillDate.click();
        const calendar = this.page.locator('mat-calendar');
        await calendar.waitFor();

        // TODO: Implement robust date selection logic to handle month/year navigation
        // if the target date is not in the current view.

        // Select the day by text content ensuring exact match for the number
        await calendar.locator(`//button[contains(@class, 'mat-calendar-body-cell')]//span[normalize-space()='${day}']`).click();
    }

    async fillAmount(amount: string) {
        await this.inputAmount.fill(amount);
    }

    async fillRutProvider(rut: string) {
        await this.inputRutProvider.fill(rut);
    }

    async fillDocumentNumber(number: string) {
        await this.inputDocumentNumber.fill(number);
    }

    async fillComment(comment: string) {
        await this.inputComment.fill(comment);
    }

    async selectPolicy(index: number = 0) {
        await this.dropdownPolicy.click();
        const option = this.page.locator(`(//ng-dropdown-panel//div[contains(@class, 'ng-option')])[${index + 1}]`);
        await option.click();
    }

    async selectCurrency(index: number = 0) {
        await this.dropdownCurrency.click();
        const option = this.page.locator(`(//ng-dropdown-panel//div[contains(@class, 'ng-option')])[${index + 1}]`);
        await option.click();
    }

    async selectCategory(index: number = 0) {
        await this.dropdownCategory.click();
        const option = this.page.locator(`(//ng-dropdown-panel//div[contains(@class, 'ng-option')])[${index + 1}]`);
        await option.click();
    }

    async selectDocumentType(typeName: string) {
        await this.radioDocumentType.getByText(typeName).click();
    }

    async clickSave() {
        await this.buttonSave.click();
    }

    async uploadFileViaIcon(filePath: string) {
        await this.iconInputFileUpload.setInputFiles(filePath);
    }

    async uploadFileViaContainer(filePath: string) {
        await this.inputFile.setInputFiles(filePath);
    }
}