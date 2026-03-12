import {expect, Page} from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatePickerPage extends HelperBase{        

    constructor(page: Page) {
        super(page)        
    }

    async selectCommonDatepickerDate(numberOfDaysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const expectedDate = await this.selectDatepickerDate(numberOfDaysFromToday)

        await expect(calendarInputField).toHaveValue(expectedDate)   
    }

    async selectDatepickerRangeDate(starDateFromToday: number, endDateFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const expectedStartDate = await this.selectDatepickerDate(starDateFromToday)
        const expectedEndDate = await this.selectDatepickerDate(endDateFromToday)

        const expectedRangeDate = `${expectedStartDate} - ${expectedEndDate}`
        await expect(calendarInputField).toHaveValue(expectedRangeDate)

    }

    private async selectDatepickerDate(numberOfDaysFromToday: number) {
        const targetDate = new Date()
        targetDate.setDate(targetDate.getDate() + numberOfDaysFromToday)
        const targetDay = targetDate.getDate()
        const targetMonthLong = targetDate.toLocaleString('default', { month: 'long' })
        const targetMonthShort = targetDate.toLocaleString('default', { month: 'short' })
        const targetYear = targetDate.getFullYear()

        let calendarHeadMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const targeMonthAndYear = `${targetMonthLong} ${targetYear}`
        
        while (calendarHeadMonthAndYear.trim() != targeMonthAndYear) {
            await this.page.locator('.next-month').click()
            calendarHeadMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }

        await this.page.locator('.day-cell:not(.bounding-month)').getByText(targetDay.toString(), { exact: true }).click()
        return `${targetMonthShort} ${targetDay}, ${targetYear}`
    }
}