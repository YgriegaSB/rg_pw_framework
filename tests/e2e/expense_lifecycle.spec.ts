import { test, expect } from '@src/fixtures/baseTest';
import * as data from '@src/data/users.json';
import * as path from 'path';

test.describe('E2E: Expense Lifecycle', () => {

    const user = data.users.validUser;

    test('User can upload a receipt via Scanit and see it in the list', async ({ page, signInPage, selectCompanyPage, sidebar, billsPage, newBillModal }) => {

        const receiptPath = path.join(process.cwd(), 'src/data/images/boleta_starbucks.jpg');

        await test.step('1. Login to the application', async () => {
            await signInPage.goto();
            await signInPage.login(user.username, user.password);
            await expect(selectCompanyPage.cards.first()).toBeVisible();
        });

        await test.step('2. Select Company', async () => {
            await selectCompanyPage.selectCompany(user.company);
            await expect(selectCompanyPage.cards.first()).not.toBeVisible();
        });

        await test.step('3. Navigate to Bills', async () => {
            await sidebar.clickBills();
            await expect(billsPage.title).toBeVisible();
        });

        await test.step('4. Open New Bill Modal', async () => {
            await billsPage.clickNewBill();
            await expect(newBillModal.title).toBeVisible();
        });

        await test.step('5. Upload Receipt via Scanit', async () => {
            await newBillModal.switchToScanit();

            await expect(newBillModal.uploadDropZone).toBeVisible();

            await newBillModal.selectPolicy(0);

            await newBillModal.uploadFile(receiptPath);

            await newBillModal.clickContinue();

            await expect(newBillModal.title).not.toBeVisible();
        });

        await test.step('6. Verify Processing/Presence in Grid', async () => {
            await expect(billsPage.buttonStopScanit.first()).toBeVisible({ timeout: 15000 });
        });

    });
});
