import test, { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase{    

    constructor(page: Page) {
        super(page)
    }

    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms')    
        await this.page.getByText('Form Layouts').click()
    }

    async datepickerPage() {
        await this.selectGroupMenuItem('Forms')
        await this.waitForSecond(1) //Wait for the menu to expand
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupMenuItem(groupTitle: string) {
        const groupMenu = await this.page.getByTitle(groupTitle)
        const isExpanded = await groupMenu.getAttribute('aria-expanded')
        if (isExpanded == 'false') {
            await groupMenu.click()
        }
    }
}