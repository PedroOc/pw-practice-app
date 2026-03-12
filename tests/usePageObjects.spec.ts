import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutPage } from "../page-objects/formLayoutPage";
import { DatePickerPage } from "../page-objects/datePickerPage";
import { PageManager } from "../page-objects/pageManager";
import { faker } from '@faker-js/faker'

test.describe.configure({ mode: 'parallel' })

test.beforeEach(async ({ page }) => {
    await page.goto('/')    
})

test('submit a email and password using the grid form', async ({page}) => {
    const navigationPage = new NavigationPage(page)
    await navigationPage.formLayoutsPage()

    const formLayoutPage = new FormLayoutPage(page)
    await formLayoutPage.submitUsingTheGridFormWithCredentialsAndSelectionOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
})

test('submit a name and email using the inline form', async ({page}) => {
    const navigationPage = new NavigationPage(page)
    await navigationPage.formLayoutsPage()

    const formLayoutPage = new FormLayoutPage(page)
    await formLayoutPage.submitInlineFormWithNameEmailAndCheckbox('Test', process.env.USERNAME, true)
    await formLayoutPage.submitInlineFormWithNameEmailAndCheckbox('Test', process.env.USERNAME, false)
})

test('Trying Datapicker', async ({page}) => {
    const navigationPage = new NavigationPage(page)
    await navigationPage.datepickerPage()

    const datePickerPage = new DatePickerPage(page)
    await datePickerPage.selectCommonDatepickerDate(500)
})

test('Trying Range Datapicker', async ({page}) => {
    const navigationPage = new NavigationPage(page)
    await navigationPage.datepickerPage()

    const datePickerPage = new DatePickerPage(page)
    await datePickerPage.selectDatepickerRangeDate(5, 20)
})

test.describe.parallel('PM - Page Manager', () => {
    // test.describe.configure({ mode: 'serial' })

    test('navigate to form page', async ({page}) => {
        const pm = new PageManager(page)
        await pm.navigateTo().formLayoutsPage()
        await pm.navigateTo().datepickerPage()
        await pm.navigateTo().smartTablePage()
        await pm.navigateTo().toastrPage()
        await pm.navigateTo().tooltipPage()
    })

    test('submit a email and password using the grid form', async ({page}) => {
        const randomFullName = faker.person.fullName()
        const randomEmail =  `${randomFullName.replace(/ /g, '').toLowerCase()}${faker.number.int(1000)}@test.com`

        const pm = new PageManager(page)
        await pm.navigateTo().formLayoutsPage()
        await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectionOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
        // await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)

        await expect(await pm.onFormLayoutPage().objectGridForm()).toHaveScreenshot({maxDiffPixels: 200})
    })
})