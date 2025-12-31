import { type Locator, type Page } from '@playwright/test';

export class AddBillsToReport {
    readonly page: Page;

    readonly tabCreatedBills: Locator;
    readonly tabCreateBill: Locator;
    readonly buttonCancel: Locator;
    readonly buttonAddBills: Locator;

    // Checkbox is generic, we will use it with nth(index) or relative to a row
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

    /**
     * Selects a bill checkbox by its index in the list.
     * Note: Indices are 0-based.
     */
    async selectBillCheckByIndex(index: number) {
        await this.checkbox.nth(index).click();
    }

    /**
     * Selects a bill checkbox by finding the row with the exact expense name.
     * Strategy:
     * 1. Find the span with the expense name.
     * 2. Traverse up to the common container or find the checkbox relative to it.
     * Based on the user request:
     * //div[@class='textCheck text-black']/span[@class='bold ng-star-inserted'] is the name.
     * The structure usually is a row containing both the name and the checkbox/radio.
     * In the image, the radio/checkbox is on the left.
     * Assuming the checkbox is within the same `gridItem` or row container.
     */
    async selectBillCheckByName(expenseName: string) {
        // We look for a row that contains the specific name
        // And then find the checkbox within that row.
        // Since we don't have the full row xpath from the user, we'll try to find the checkbox that shares a common ancestor 
        // or uses the row logic if we can infer it. 
        // Let's assume the standard gridItem structure. 
        // Locator for the row:
        const row = this.page.locator(`xpath=//div[contains(@class, 'gridItem')][.//span[contains(@class, 'bold') and normalize-space()='${expenseName}']]`);
        const checkbox = row.locator("input[type='checkbox']");
        await checkbox.click();
    }
}
