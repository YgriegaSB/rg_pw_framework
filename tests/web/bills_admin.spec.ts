import { test, expect } from '@src/fixtures/baseTest';
import * as data from '@src/data/users.json';


test.describe('Bills management', () => {

    const user = data.users.validUser;

    test('Verify Bills Grid Interaction', async ({ page, signInPage, selectCompanyPage, sidebar, billsPage }) => {
        const targetName = 'Panaderia los Vidales Limitada';

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