import { test, expect } from '@src/fixtures/baseTest';
import * as data from '@src/data/users.json';
import * as expensesData from '@src/data/expenses.json';
import * as path from 'path';

test.describe('New Simple Bill Creation', () => {

    const user = data.users.validUser;
    const expense = expensesData.expenses.simpleBill;

    test('Create a Simple Expense successfully', async ({ page, signInPage, selectCompanyPage, sidebar, billsPage, newBillModal, newSimpleBill, snackBar }) => {
        const receiptPath = path.join(process.cwd(), 'src/data/images/boleta_starbucks.jpg');

        await test.step('Login and Setup', async () => {
            await signInPage.goto();
            await signInPage.login(user.username, user.password);
            await selectCompanyPage.selectCompany(user.company);
            await sidebar.clickBills();
        });

        await test.step('Open New Simple Bill Form', async () => {
            await billsPage.clickNewBill();
            await expect(newBillModal.title).toBeVisible();

            await newBillModal.switchToSimple();

            await newBillModal.selectSimplePolicy(0);
            await newBillModal.clickContinue();
        });

        await test.step('Fill Simple Bill Form', async () => {
            await expect(newSimpleBill.currentModule).toContainText('Nuevo gasto');

            await newSimpleBill.inputMerchant.waitFor({ state: 'visible' });

            await newSimpleBill.fillMerchant(expense.merchant);
            await newSimpleBill.selectDate(expense.dateDay);
            await newSimpleBill.fillAmount(expense.amount);

            await newSimpleBill.selectCategory(0);

            await newSimpleBill.fillRutProvider(expense.rutProvider);

            await newSimpleBill.radioDocumentType.first().click();
            await newSimpleBill.fillDocumentNumber(expense.documentNumber);

            await newSimpleBill.fillComment(expense.comment);

            await newSimpleBill.uploadFileViaContainer(receiptPath);
        });

        await test.step('Save', async () => {
            await newSimpleBill.clickSave();

            const message = await snackBar.getMessage();
            console.log(`Notification received: ${message}`);
            await expect(snackBar.container).toBeVisible();
        });
    });
});
