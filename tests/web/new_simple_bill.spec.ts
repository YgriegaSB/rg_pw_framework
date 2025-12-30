import { test, expect } from '@src/fixtures/baseTest';
import { SignInPage } from '@src/web/pages/SignInPage';
import { SelectCompanyPage } from '@src/web/pages/SelectCompanyPage';
import { Sidebar } from '@src/web/components/Sidebar';
import { BillsPage } from '@src/web/pages/BillsPage';
import { NewBillModal } from '@src/web/components/NewBillModal';
import { NewSimpleBill } from '@src/web/pages/NewSimpleBill';
import { SnackBar } from '@src/web/components/SnackBar';
import * as data from '@src/data/users.json';
import * as path from 'path';

test.describe('New Simple Bill Creation', () => {

    const user = data.users.validUser;

    test('Create a Simple Expense successfully', async ({ page }) => {
        const signInPage = new SignInPage(page);
        const selectCompanyPage = new SelectCompanyPage(page);
        const sidebar = new Sidebar(page);
        const billsPage = new BillsPage(page);
        const newBillModal = new NewBillModal(page);
        const newSimpleBill = new NewSimpleBill(page);
        const snackBar = new SnackBar(page);

        // Uso de imagen real existente
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

            await newSimpleBill.selectPolicy(0);
            await newBillModal.clickContinue();
        });

        await test.step('Fill Simple Bill Form', async () => {
            await expect(newSimpleBill.currentModule).toContainText('Nuevo gasto');

            await newSimpleBill.inputMerchant.waitFor({ state: 'visible' });

            await newSimpleBill.fillMerchant('Starbucks Test');
            await newSimpleBill.selectDate('15');
            await newSimpleBill.fillAmount('5000');

            await newSimpleBill.selectCategory(0);

            await newSimpleBill.fillRutProvider('76.123.456-7');
            await newSimpleBill.radioDocumentType.first().click();
            await newSimpleBill.fillDocumentNumber('123123456');

            await newSimpleBill.fillComment('Gasto de prueba automatizado');

            await newSimpleBill.uploadFileViaContainer(receiptPath);
        });

        await test.step('Save', async () => {
            await newSimpleBill.clickSave();

            const message = await snackBar.getMessage();
            console.log(`Notification received: ${message}`);

            await expect(snackBar.container).toBeVisible();

            //TODO: verificar redireccion a vista detalle gasto
        });
    });
});
