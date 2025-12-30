import { test, expect } from '@src/fixtures/baseTest';
import { SignInPage } from '@src/web/pages/SignInPage';
import { SelectCompanyPage } from '@src/web/pages/SelectCompanyPage';
import { Sidebar } from '@src/web/components/Sidebar';
import { BillsPage } from '@src/web/pages/BillsPage';
import { NewBillModal } from '@src/web/components/NewBillModal';
import * as data from '@src/data/users.json';

test.describe('Bills Creation', () => {

    const user = data.users.validUser;

    test('Verify New Bill Modal', async ({ page }) => {
        const signInPage = new SignInPage(page);
        const selectCompanyPage = new SelectCompanyPage(page);
        const sidebar = new Sidebar(page);
        const billsPage = new BillsPage(page);
        const newBillModal = new NewBillModal(page);

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
            await expect(newBillModal.title).not.toBeVisible();
        });
    });
});
