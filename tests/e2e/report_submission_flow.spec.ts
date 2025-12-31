import { test, expect } from '@src/fixtures/baseTest';
import expenseData from '@src/data/expenses.json';
import path from 'path';
import { users } from '@src/data/users.json';

test.describe('Report Submission E2E Flows', () => {
    const user = users.validUser;

    const uniqueId = Date.now().toString();
    const expenseMerchant = `${expenseData.expenses.simpleBill.merchant} ${uniqueId}`;
    const reportTitle = `Reporte Auto ${uniqueId}`;

    test('Happy Path: Create Expense, Create Report, Add Expense, Send Report', async ({
        page,
        signInPage,
        selectCompanyPage,
        billsPage,
        newBillModal,
        newSimpleBill,
        reportsPage,
        newReportModal,
        newReportPage,
        reportDetailsPage,
        sidebar,
        billDetailsPage,
        sendReportModal,
        notificationModal,
    }) => {
        await test.step('Login and Select Company', async () => {
            await signInPage.goto();
            await signInPage.login(user.username, user.password);
            await selectCompanyPage.selectCompany(user.company);
        });

        await test.step('Create a Simple Expense', async () => {
            await billsPage.clickNewBill();
            await newBillModal.switchToSimple();
            await newBillModal.selectSimplePolicy();
            await newBillModal.clickContinue();

            await expect(newSimpleBill.currentModule).toBeVisible();
            await newSimpleBill.inputMerchant.waitFor();

            const imagePath = path.resolve(__dirname, '../../src/data/images/boleta_starbucks.jpg');
            await newSimpleBill.uploadFileViaContainer(imagePath);
            await expect(page.locator('app-drag-and-drop')).toBeHidden({ timeout: 10000 });

            await newSimpleBill.fillMerchant(expenseMerchant);
            await newSimpleBill.selectDate(expenseData.expenses.simpleBill.dateDay);
            await newSimpleBill.fillAmount(expenseData.expenses.simpleBill.amount);

            await newSimpleBill.fillRutProvider(expenseData.expenses.simpleBill.rutProvider);
            await newSimpleBill.selectDocumentType('Boleta');
            await newSimpleBill.fillDocumentNumber(expenseData.expenses.simpleBill.documentNumber);
            await newSimpleBill.fillComment(expenseData.expenses.simpleBill.comment);

            await newSimpleBill.clickSave();
            await expect(billDetailsPage.currentModuleTitle).toBeVisible();
        });

        await test.step('Create New Report', async () => {
            await sidebar.clickReports();

            await expect(reportsPage.titleModule).toBeVisible();
            await reportsPage.clickCreateReport();

            await newReportModal.selectPolicy(0);
            await newReportModal.fillTitle(reportTitle);

            await newReportModal.clickCreateReport();
        });

        await test.step('Add Expense to Report', async () => {
            await expect(reportDetailsPage.detailsBills).toBeVisible();

            await newReportPage.selectRandomBill();
            await newReportPage.clickSaveReport();

            await expect(reportDetailsPage.currentModuleTitle).toBeVisible();
        });

        await test.step('Send Report', async () => {
            await expect(reportDetailsPage.currentModuleTitle).toBeVisible();
            await reportDetailsPage.clickSendReport();

            await expect(sendReportModal.title).toBeVisible();
            await sendReportModal.clickSendReport();

            await expect(notificationModal.container).toBeVisible();
        });
    });

    // Test 2: Negative Path (Empty Report)
    test('Negative Path: Verify Send Report Disabled for Empty Report', async ({
        page,
        signInPage,
        selectCompanyPage,
        reportsPage,
        newReportModal,
        newReportPage,
        reportDetailsPage,
        sidebar,
    }) => {
        const emptyReportTitle = `Reporte Vacio ${Date.now()}`;

        await test.step('Login and Setup', async () => {
            await signInPage.goto();
            await signInPage.login(user.username, user.password);
            await selectCompanyPage.selectCompany(user.company);
        });

        await test.step('Create Empty Report', async () => {
            await sidebar.clickReports();
            await reportsPage.clickCreateReport();

            await newReportModal.selectPolicy(0);
            await newReportModal.fillTitle(emptyReportTitle);
            await newReportModal.clickCreateReport();

            await expect(newReportPage.currentModuleTitle).toBeVisible();

            await newReportPage.clickSaveReport();
        });

        await test.step('Verify Send Button Disabled', async () => {
            await expect(reportDetailsPage.currentModuleTitle).toBeVisible({ timeout: 10000 });

            await expect(reportDetailsPage.sendReportButton).toBeDisabled({ timeout: 10000 });
        });
    });
});
