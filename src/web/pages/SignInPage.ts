import { type Locator, type Page } from '@playwright/test';

export class SignInPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#signin_username');
        this.passwordInput = page.locator('#signin_password');
        this.loginButton = page.locator('#undefined');
    }

    async goto() {
        await this.page.goto('/signin');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.loginButton.click();
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async isLoggedIn(): Promise<boolean> {
        return this.loginButton.isVisible();
    }

}
