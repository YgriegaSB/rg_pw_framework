import { type Locator, type Page } from '@playwright/test';

export class Header {
    readonly page: Page;

    // Faster Creation Menu
    readonly fasterCreationButton: Locator;
    readonly createExpenseOption: Locator;
    readonly createReportOption: Locator;

    // User Menu
    readonly containerUserButton: Locator;
    readonly profileOption: Locator;
    readonly leaveFeedbackOption: Locator;
    readonly newsOption: Locator;
    readonly logoutOption: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fasterCreationButton = page.locator('#globalNewCreate');
        this.createExpenseOption = page.locator('//div[text()=" Crear gasto "]');
        this.createReportOption = page.locator('//div[text()=" Crear informe "]');
        this.containerUserButton = page.locator('.containerRightUser');
        this.profileOption = page.locator('//div[text()=" Perfil "]');
        this.leaveFeedbackOption = page.locator('//div[text()=" Dejar feedback "]');
        this.newsOption = page.locator('//div[text()=" Novedades "]');
        this.logoutOption = page.locator('//div[text()=" Cerrar sesión "]');
    }

    async clickFasterCreation() {
        await this.fasterCreationButton.click();
    }

    async clickCreateExpense() {
        await this.createExpenseOption.click();
    }

    async clickCreateReport() {
        await this.createReportOption.click();
    }

    async clickUserMenu() {
        await this.containerUserButton.click();
    }

    async clickProfile() {
        await this.profileOption.click();
    }

    async clickLeaveFeedback() {
        await this.leaveFeedbackOption.click();
    }

    async clickNews() {
        await this.newsOption.click();
    }

    async clickLogout() {
        await this.logoutOption.click();
    }
}
