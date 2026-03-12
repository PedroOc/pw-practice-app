import {test as base} from '@playwright/test';
import { PageManager } from '../pw-practice-app/page-objects/pageManager';

export type TestOptions = {
    globalQAUrl: string
    formLayoutPage: string
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalQAUrl: ['', { option: true }],

    formLayoutPage: async ({ page, pageManager }, use, testInfo) => {
        await page.goto('/')
        if (testInfo.project.name === 'mobile') 
            await page.locator('.sidebar-toggle').click()        
        await pageManager.navigateTo().formLayoutsPage()
        if (testInfo.project.name === 'mobile') 
            await page.locator('.sidebar-toggle').click()        
        await use('')
    },

    pageManager: async ({ page }, use) => {
        await use(new PageManager(page))
    },
})