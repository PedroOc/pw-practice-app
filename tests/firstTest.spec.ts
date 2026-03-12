import {expect, test} from '@playwright/test';

test.beforeEach(async ({page}) => {
   await page.goto('/')
//    await page.getByText('Forms').click() 
})

test.describe.skip('Switch 2', () => {
    test.beforeEach(async ({page}) => {
    await page.getByText('Charts').click() 
    })

    test('first test', async({page}) => {   
    await page.getByText('Form Layouts').click()
    })

    test('navigate to datepicker test', async({page}) => {   
    await page.getByText('Datepicker').click()
    })
})

test.describe('Switch', () => {
    test.beforeEach(async ({page}) => {
    await page.getByText('Forms').click() 
    })

    test('first test', async({page}) => {   
    await page.getByText('Form Layouts').click()
    })

    test('navigate to datepicker test', async({page}) => {   
    await page.getByText('Datepicker').click()
    })
})

test.describe('Form Layout tests', () => {
    test.describe.configure({retries: 2})

    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click() 
        await page.getByText('Form Layouts').click()
    })

    test('locator sintax', async({page}) => {
    await page.locator('input').first().click()

    page.locator('#inputEmail1')

    page.locator('.shape-rectangle')

    page.locator('[placeholder="Email"]')

    page.locator('class="input-full-width size-medium status-basic shape-rectangle nb-transition')

    page.locator('input[placeholder="Email"][nbinput]')

    page.locator('//*[@id="inputEmail1"]')

    page.locator(':text("Using")')

    page.locator(':text-is("Using the Grid")')
    })

    test('Use facing locators', async({page}) => {
        await page.getByRole('textbox', {name: 'Email'}).first().click()
        await page.getByRole('button', {name: 'Sign in'}).first().click()
        
        await page.getByLabel('Email').first().click()

        await page.getByPlaceholder('Jane Doe').click()

        await page.getByText('Using the Grid').click()

        await page.getByTitle('IoT Dashboard').click()
    })

    test('location child elements', async({page}) => {        
        await page.locator('nb-card nb-radio :text-is("Option 1")').click()
        await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

        await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click()

        await page.locator('nb-card').nth(3).getByRole('button').click()
    }) 

    test('locating parent element', async({page}) => {
        await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: 'Email'}).click()
        await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: 'Email'}).click()

        await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: 'Email'}).click()
        await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: 'Password'}).click()
    })

    test('Reusing locators', async({page}, testInfo) => {
        if(testInfo){
            console.log(testInfo.title)
            console.log(testInfo.duration)
        }

        const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
        const emailInput = basicForm.getByRole('textbox', {name: 'Email'})
        const passwordInput = basicForm.getByRole('textbox', {name: 'Password'})
        const submitButton = basicForm.getByRole('button', {name: 'Submit'})

        await emailInput.fill('test@test.com')
        await passwordInput.fill('test')
        await basicForm.locator('nb-checkbox').click()
        await submitButton.click()

        await expect(emailInput).toHaveValue('test@test.com')
    })

    test('extracting values', async({page}) => {
        const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
        const buttonText = await basicForm.getByRole('button', {name: 'Submit'}).textContent()
        expect(buttonText).toEqual('Submit')

        const allRadioButtons = await page.locator('nb-radio').allTextContents()
        expect(allRadioButtons).toContain('Option 1')

        const emailInput = basicForm.getByRole('textbox', {name: 'Email'})
        await emailInput.fill('test@test.com')
        const emailValue = await emailInput.inputValue()
        expect(emailValue).toEqual('test@test.com')

        const placeholderValue = await emailInput.getAttribute('placeholder')
        expect(placeholderValue).toEqual('Email')
    })

})

test('update the attribute slide', async({page}) => {
    const tempGaude = page.locator('[tabtitle="Temperature"] circle')
    // await tempGaude.evaluate( node => {
    //     node.setAttribute('cx', '20.32')
    //     node.setAttribute('cy', '86.71')
    // })
    // await tempGaude.click()

    //mouse move
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await page.mouse.move(x, y)
    await page.mouse.down()
    await page.mouse.move(x - 75, y)
    await page.mouse.move(x - 75, y + 50)
    await page.mouse.up()

    await expect(tempBox).toContainText('14  Celsius')
})

