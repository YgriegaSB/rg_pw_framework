import { type Locator, type Page } from '@playwright/test';

export class NewReportPage {
    readonly page: Page;

    readonly mainModuleReports: Locator;
    readonly currentModuleTitle: Locator;
    readonly inputTitle: Locator;
    readonly inputFile: Locator;
    readonly comments: Locator;
    readonly buttonSaveReport: Locator;

    constructor(page: Page) {
        this.page = page;

        this.mainModuleReports = page.locator("//div/descendant::div[@class='nav']");
        this.currentModuleTitle = page.locator("//div[@class='top-menu']/descendant::div[text()='Crear informe']");

        this.inputTitle = page.locator('#title');
        this.inputFile = page.locator("//input[@type='file']");
        this.comments = page.locator("//div[@id='commentField']/descendant::textarea");
        this.buttonSaveReport = page.locator("//button/span[text()='Guardar cambios']");
    }

    async fillTitle(title: string) {
        await this.inputTitle.fill(title);
    }

    async fillComments(comments: string) {
        await this.comments.fill(comments);
    }

    async uploadFile(filePath: string) {
        await this.inputFile.setInputFiles(filePath);
    }

    async clickSaveReport() {
        await this.buttonSaveReport.click();
    }
}
