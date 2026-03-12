import { expect } from '@playwright/test';
import {test} from '../test-options'

test('drag and drop test', async ({ page, globalQAUrl }) => {
    await page.goto(globalQAUrl)

    page.getByRole('button', { name: 'Consent' }).click()

    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
    const tratas2 = frame.getByText('High Tatras 2')
    const trash = frame.locator('#trash')

    tratas2.click()
    
    await tratas2.dragTo(trash)
    await expect(trash.locator('li h5')).toHaveText('High Tatras 2')

    const tratas4 = frame.getByText('High Tatras 4')
    await tratas4.hover()
    await page.mouse.down()
    await trash.hover()
    await page.mouse.up()

    await expect(trash.locator('li h5')).toHaveText(['High Tatras 2','High Tatras 4'])
})