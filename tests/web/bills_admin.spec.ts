import { test, expect } from '@src/fixtures/baseTest';
import * as data from '@src/data/users.json';
import * as expensesData from '@src/data/expenses.json';
import * as path from 'path';

test.describe('Bills management', () => {
    const user = data.users.validUser;

    test('Verify Bills Grid Interaction', async ({
        signInPage,
        selectCompanyPage,
        sidebar,
        billsPage,
        newBillModal,
        newSimpleBill
    }) => {
        const targetName = `${expensesData.expenses.simpleBill.merchant} ${Date.now()}`;

        await test.step('Login and Select Company', async () => {
            await signInPage.goto();
            await signInPage.login(user.username, user.password);

            await expect(selectCompanyPage.cards.first()).toBeVisible({ timeout: 10000 });
            await selectCompanyPage.selectCompany(user.company);
        });

        await test.step('Navigate to Bills Module', async () => {
            await sidebar.clickBills();
            await expect(billsPage.title).toBeVisible();
        });

        await test.step('Ensure Bill Exists', async () => {
            const receiptPath = path.join(process.cwd(), 'src/data/images/boleta_starbucks.jpg');
            const expense = expensesData.expenses.simpleBill;

            await billsPage.clickNewBill();
            await newBillModal.switchToSimple();
            await newBillModal.selectSimplePolicy(0);
            await newBillModal.clickContinue();

            await newSimpleBill.inputMerchant.waitFor({ state: 'visible' });
            await newSimpleBill.fillMerchant(targetName);
            await newSimpleBill.selectDate(expense.dateDay);
            await newSimpleBill.fillAmount(expense.amount);
            await newSimpleBill.selectCategory(0);
            await newSimpleBill.fillRutProvider(expense.rutProvider);
            await newSimpleBill.radioDocumentType.first().click();
            await newSimpleBill.fillDocumentNumber(Math.floor(Math.random() * 100000).toString());
            await newSimpleBill.fillComment(expense.comment);
            await newSimpleBill.uploadFileViaContainer(receiptPath);

            await newSimpleBill.clickSave();
            await newSimpleBill.clickPrincipalModule();
        });

        await test.step('Extract data from row', async () => {
            await expect(billsPage.gridColumns).toBeVisible();
            await billsPage.searchBill(targetName);
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
