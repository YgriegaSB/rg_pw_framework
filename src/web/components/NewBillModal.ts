import { type Locator, type Page } from '@playwright/test';

export class NewBillModal {
    readonly page: Page;

    readonly title: Locator;
    readonly tabScanit: Locator;
    readonly tabSimple: Locator;
    readonly tabMultiple: Locator;
    readonly tabDistance: Locator;

    readonly dropdownPolicy: Locator;
    readonly buttonCancel: Locator;
    readonly buttonContinue: Locator;
    readonly inputFile: Locator;
    readonly uploadDropZone: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('text=Nuevo gasto').first();
        this.tabScanit = page.locator("//div[@role='tab' and @aria-label='scanit-tab']");
        this.tabSimple = page.locator("//div[@role='tab' and @aria-label='simple-tab']");
        this.tabMultiple = page.locator("//div[@role='tab' and @aria-label='multiple-tab']");
        this.tabDistance = page.locator("//div[@role='tab' and @aria-label='distance-tab']");
        this.dropdownPolicy = page.locator('#scanit-policy-select');
        this.buttonCancel = page.locator("//button/span[text()='Cancelar']");
        this.buttonContinue = page.locator("//button/span[text()='Continuar']");
        this.inputFile = page.locator("//app-drag-and-drop//input[@type='file']");
        this.uploadDropZone = page.locator("app-drag-and-drop");
    }

    async uploadFile(filePath: string) {
        await this.inputFile.setInputFiles(filePath);
    }

    async selectPolicy(index: number = 0) {
        await this.dropdownPolicy.click();
        const option = this.page.locator(`(//ng-dropdown-panel//div[contains(@class, 'ng-option')])[${index + 1}]`);
        await option.click();
    }

    async clickContinue() {
        await this.buttonContinue.click();
    }

    async clickCancel() {
        await this.buttonCancel.click();
    }

    async switchToScanit() {
        await this.tabScanit.click();
    }

    async switchToSimple() {
        await this.tabSimple.click();
    }

    async switchToMultiple() {
        await this.tabMultiple.click();
    }

    async switchToDistance() {
        await this.tabDistance.click();
    }
}
