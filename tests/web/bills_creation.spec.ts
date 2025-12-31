import { test, expect } from '@src/fixtures/baseTest';
import * as data from '@src/data/users.json';

test.describe('Bills Creation', () => {
    const user = data.users.validUser;

    test('Verify New Bill Modal', async ({ signInPage, selectCompanyPage, sidebar, billsPage, newBillModal }) => {
        await test.step('Login and Select Company', async () => {
            await signInPage.goto();
            await signInPage.login(user.username, user.password);
            await selectCompanyPage.selectCompany(user.company);
        });

        await test.step('Navigate to Bills and Open Modal', async () => {
            await sidebar.clickBills();
            await billsPage.clickNewBill();
        });

        await test.step('Verify Modal Elements', async () => {
            await expect(newBillModal.title).toBeVisible();

            await expect(newBillModal.tabScanit).toBeVisible();
            await expect(newBillModal.tabSimple).toBeVisible();
            await expect(newBillModal.tabMultiple).toBeVisible();
            await expect(newBillModal.tabDistance).toBeVisible();

            await expect(newBillModal.dropdownPolicy).toBeVisible();
            await expect(newBillModal.uploadDropZone).toBeVisible();
            await expect(newBillModal.buttonContinue).toBeVisible();
            await expect(newBillModal.buttonCancel).toBeVisible();

            await newBillModal.clickCancel();
            await expect(newBillModal.title).toBeHidden();
        });
    });
});
