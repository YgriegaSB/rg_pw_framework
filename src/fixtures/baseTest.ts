import { test as baseTest } from '@playwright/test';
import { SignInPage } from '@src/web/pages/SignInPage';
import { SelectCompanyPage } from '@src/web/pages/SelectCompanyPage';
import { Sidebar } from '@src/web/components/Sidebar';
import { BillsPage } from '@src/web/pages/BillsPage';
import { NewBillModal } from '@src/web/components/NewBillModal';
import { NewSimpleBillPage } from '@src/web/pages/NewSimpleBillPage';
import { BillDetailsPage } from '@src/web/pages/BillDetailsPage';
import { ReportsPage } from '@src/web/pages/ReportsPage';
import { NewReportModal } from '@src/web/components/NewReportModal';
import { NewReportPage } from '@src/web/pages/NewReportPage';
import { ReportDetailsPage } from '@src/web/pages/ReportDetailsPage';
import { AddBillsToReport } from '@src/web/components/AddBillsToReport';
import { SendReportModal } from '@src/web/components/SendReportModal';
import { NotificationModal } from '@src/web/components/NotificationModal';
import { SnackBar } from '@src/web/components/SnackBar';

type Pages = {
    signInPage: SignInPage;
    selectCompanyPage: SelectCompanyPage;
    sidebar: Sidebar;
    billsPage: BillsPage;
    newBillModal: NewBillModal;
    newSimpleBill: NewSimpleBillPage;
    billDetailsPage: BillDetailsPage;
    reportsPage: ReportsPage;
    newReportModal: NewReportModal;
    newReportPage: NewReportPage;
    reportDetailsPage: ReportDetailsPage;
    addBillsToReport: AddBillsToReport;
    sendReportModal: SendReportModal;
    notificationModal: NotificationModal;
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
    billDetailsPage: async ({ page }, use) => {
        await use(new BillDetailsPage(page));
    },
    reportsPage: async ({ page }, use) => {
        await use(new ReportsPage(page));
    },
    newReportModal: async ({ page }, use) => {
        await use(new NewReportModal(page));
    },
    newReportPage: async ({ page }, use) => {
        await use(new NewReportPage(page));
    },
    reportDetailsPage: async ({ page }, use) => {
        await use(new ReportDetailsPage(page));
    },
    addBillsToReport: async ({ page }, use) => {
        await use(new AddBillsToReport(page));
    },
    sendReportModal: async ({ page }, use) => {
        await use(new SendReportModal(page));
    },
    notificationModal: async ({ page }, use) => {
        await use(new NotificationModal(page));
    },
    snackBar: async ({ page }, use) => {
        await use(new SnackBar(page));
    },
});

export { expect } from '@playwright/test';
