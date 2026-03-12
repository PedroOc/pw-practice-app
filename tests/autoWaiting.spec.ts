import {expect, test} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto(process.env.URL)
    await page.getByRole('button', {name: 'Button Triggering AJAX Request'}).click()
})

test('await exemples', async({page}) => {
    const messageSucess = page.locator('.bg-success')
    
    // await messageSucess.click()

    // const textContent = await messageSucess.textContent()
    // await messageSucess.waitFor({state: 'attached'})
    // const textContent = await messageSucess.allTextContents()

    // expect(textContent).toEqual('Data loaded with AJAX get request.')
    // await expect(messageSucess).toHaveText('Data loaded with AJAX get request.')

    await expect(messageSucess).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test.skip('alternative waits', async({page}) => {
    const messageSucess = page.locator('.bg-success')

    // await page.waitForSelector('.bg-success')

    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //Não recomendado pois pode ser afetado por outros requests que não tem prioridade no teste
    await page.waitForLoadState('networkidle')

    const textContent = await messageSucess.allTextContents()
    expect(textContent).toContain('Data loaded with AJAX get request.')
})
