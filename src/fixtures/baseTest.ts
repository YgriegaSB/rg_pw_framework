import { test as baseTest } from '@playwright/test';
import { SignInPage } from '@src/web/pages/SignInPage';
import { SelectCompanyPage } from '@src/web/pages/SelectCompanyPage';
import { Sidebar } from '@src/web/components/Sidebar';
import { BillsPage } from '@src/web/pages/BillsPage';
import { NewBillModal } from '@src/web/components/NewBillModal';
import { NewSimpleBillPage } from '@src/web/pages/NewSimpleBillPage';
import { SnackBar } from '@src/web/components/SnackBar';

type Pages = {
    signInPage: SignInPage;
    selectCompanyPage: SelectCompanyPage;
    sidebar: Sidebar;
    billsPage: BillsPage;
    newBillModal: NewBillModal;
    newSimpleBill: NewSimpleBillPage;
    snackBar: SnackBar;
};

export const test = baseTest.extend<Pages>({
    signInPage: async ({ page }, use) => {
        await use(new SignInPage(page));
    },
    selectCompanyPage: async ({ page }, use) => {
        await use(new SelectCompanyPage(page));
    },
    sidebar: async ({ page }, use) => {
        await use(new Sidebar(page));
    },
    billsPage: async ({ page }, use) => {
        await use(new BillsPage(page));
    },
    newBillModal: async ({ page }, use) => {
        await use(new NewBillModal(page));
    },
    newSimpleBill: async ({ page }, use) => {
        await use(new NewSimpleBillPage(page));
    },
    snackBar: async ({ page }, use) => {
        await use(new SnackBar(page));
    },
});

export { expect } from '@playwright/test';
