import { test, expect } from '@src/fixtures/baseTest';
import { SignInPage } from '@src/web/pages/SignInPage';
import { SelectCompanyPage } from '@src/web/pages/SelectCompanyPage';
import * as data from '@src/data/users.json';

test.describe('Shopping Flow Architecture Check', () => {

    const user = data.users.validUser;

    test('User Login/logout Test', async ({ page }) => {
        const signInPage = new SignInPage(page);
        const selectCompanyPage = new SelectCompanyPage(page);

        await test.step('Navigate to Sign In', async () => {
            await signInPage.goto();
        });

        await test.step('Perform Login', async () => {
            await signInPage.login(user.username, user.password);
        });

        await test.step('Verify Login', async () => {
            await expect(selectCompanyPage.cards.first(), 'Company Selection should be visible').toBeVisible();
        });

        await test.step('Logout', async () => {
            await selectCompanyPage.clickLogout();
        });

        await test.step('Verify Logout', async () => {
            await expect(signInPage.usernameInput, 'Sign In should be visible').toBeVisible();
        });


    });
});
