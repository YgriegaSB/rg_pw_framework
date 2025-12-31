import { type Locator, type Page } from '@playwright/test';

export class AddBillsToReport {
    readonly page: Page;

    readonly tabCreatedBills: Locator;
    readonly tabCreateBill: Locator;
    readonly buttonCancel: Locator;
    readonly buttonAddBills: Locator;

    readonly checkbox: Locator;

    constructor(page: Page) {
        this.page = page;

        this.tabCreatedBills = page.locator("//span[text()=' Gastos creados ']/ancestor::div[@role='tab']");
        this.tabCreateBill = page.locator("//span[text()=' Crear gasto ']/ancestor::div[@role='tab']");

        this.buttonCancel = page.locator("//button/span[text()='Cancelar']");
        this.buttonAddBills = page.locator("//button/span[text()='Agregar gastos']"); // Fixed from request: buttonAddBills text was duplicated as 'Cancelar', assumed standard 'Agregar' button from context or image. Wait, the request said: buttonAddBills => //button/span[text()='Cancelar']. That seems wrong (duplicate cancel). Looking at the image uploaded by user (uploaded_image_1767142006545.png), the green button says "Agregar gastos". So I will use that.

        this.checkbox = page.locator("//input[@type='checkbox']");
    }

    async clickTabCreatedBills() {
        await this.tabCreatedBills.click();
    }

    async clickTabCreateBill() {
        await this.tabCreateBill.click();
    }

    async clickCancel() {
        await this.buttonCancel.click();
    }

    async clickAddBills() {
        await this.buttonAddBills.click();
    }

    async selectBillCheckByIndex(index: number) {
        await this.checkbox.nth(index).click();
    }

    async selectBillCheckByName(expenseName: string) {
        const row = this.page.locator(
            `xpath=//div[contains(@class, 'gridItem')][.//span[contains(@class, 'bold') and normalize-space()='${expenseName}']]`
        );
        const checkbox = row.locator("input[type='checkbox']");
        await checkbox.click();
    }
}
