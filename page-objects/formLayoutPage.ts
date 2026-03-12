import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutPage extends HelperBase {        
    
    constructor(page: Page) {
        super(page)
    }

    async objectGridForm() {
        return this.page.locator('nb-card').filter({hasText: "Using the Grid"})
    }

    async submitUsingTheGridFormWithCredentialsAndSelectionOption(email: string, password: string, option: string) {
        const usingTheGrird = await this.objectGridForm()
        await usingTheGrird.getByPlaceholder('Email').fill(email)
        await usingTheGrird.getByPlaceholder('Password').fill(password)
        await usingTheGrird.locator('nb-radio').getByText(option).click()
        await usingTheGrird.getByRole('button', { name: 'Sign in' }).click()
    }

    /**
     * This method submits the inline form with the provided name, email, and rememberMe checkbox value.
     * @param name - Should be the name of the client
     * @param email - Should be the email of the client
     * @param rememberMe - Should option to Remember me
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const inlineForm = this.page.locator('nb-card').filter({hasText: "Inline form"})
        await inlineForm.getByPlaceholder('Jane Doe').fill(name)
        await inlineForm.getByPlaceholder('Email').fill(email)
        const checkboxItem = inlineForm.getByRole('checkbox') //Uncliclable       
        if (await checkboxItem.isChecked() != rememberMe) {
            await inlineForm.locator('nb-checkbox').click() //Clickable
        }
        await inlineForm.getByRole('button', { name: 'Submit' }).click()
    }

}