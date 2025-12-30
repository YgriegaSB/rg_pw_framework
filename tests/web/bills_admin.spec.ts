import { test, expect } from '@src/fixtures/baseTest';
import { SignInPage } from '@src/web/pages/SignInPage';
import { SelectCompanyPage } from '@src/web/pages/SelectCompanyPage';
import { BillsPage } from '@src/web/pages/BillsPage';
import { Sidebar } from '@src/web/components/Sidebar';
import * as data from '@src/data/users.json';


test.describe('Bills management', () => {

    const user = data.users.validUser;

    test('Verify Bills Grid Interaction', async ({ page }) => {
        const targetName = 'Panaderia los Vidales Limitada';
        const signInPage = new SignInPage(page);
        const selectCompanyPage = new SelectCompanyPage(page);
        const sidebar = new Sidebar(page);
        const billsPage = new BillsPage(page);

        await test.step('Login and Select Company', async () => {
            await signInPage.goto();
            await signInPage.login(user.username, user.password);
            await expect(selectCompanyPage.cards.first()).toBeVisible();
            await selectCompanyPage.selectCompany(user.company);
        });

        await test.step('Navigate to Bills Module', async () => {
            await sidebar.clickBills();
            await expect(billsPage.title).toBeVisible();
        });

        await test.step('Extract data from row', async () => {
            const billData = await billsPage.getBillDataByName(targetName);
            console.log('Extracted Bill Data:', billData);

            expect(billData.name).toContain(targetName);
        });

        await test.step('Interact with Bills Grid', async () => {
            await billsPage.openRowMenuByName(targetName);
            await billsPage.openRowMenuByName(targetName);
        });
    });
});