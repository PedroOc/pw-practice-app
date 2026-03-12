import { test } from "../test-options"
import { faker } from '@faker-js/faker'

test.describe.configure({ mode: 'parallel' })

test('submit a email and password using the grid form', async ({formLayoutPage, pageManager}) => {
    const randomFullName = faker.person.fullName()
    const randomEmail =  `${randomFullName.replace(/ /g, '').toLowerCase()}${faker.number.int(1000)}@test.com`        
    await pageManager.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectionOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    await pageManager.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)
})
