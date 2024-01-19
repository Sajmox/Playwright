import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe.skip('Currency exchange form (NIE DZIALA PRZEZ ZABEZPIECZENIA CARRIEROWE ... -.-)', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        homePage.visit()
        homePage.clickOnSignIn()
        loginPage.login('username', 'password')
    })

    test('Should make currency exchange', async ({ page }) => {
        await page.click('#pay_bills_tab')
        await page.click('text=Purchase Foreign Currency')
        await page.selectOption('#pc_currency', 'EUR')
        
        const rate = await page.locator('#sp_sell_rate')
        await expect(rate).toContainText('1 ero (EUR)')
        
        await page.type('#pc_amount', '1000')
        await page.click('#pc_inDoollars_true')
        await page.click('#pc_calculate_costs')

        const coversionAmount = await page.locator('#pc_conversion_amount')
        await expect(coversionAmount).toContainText('1000.00 U.S dollar (USD)')

        await page.click('#purchase_cash')

        const message = await page.locator('#alert_content')
        await expect(message).toBeVisible()
        await expect(message).toContainText('Foreign currency cash was successfully purchased')
    })
})


