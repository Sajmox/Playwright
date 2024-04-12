import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe("Login page visual tests", () => {
    let homepage: HomePage
    let loginpage: LoginPage

    test.beforeEach(async ({ page }) => {
        homepage = new HomePage(page)
        loginpage = new LoginPage(page)

        await homepage.visit()
        await homepage.clickOnSignIn()
    })

    test('Login form', async ({ page }) => {
        await loginpage.snapshotLoginForm()
    })

    test('Login error message', async ({ page }) => {
        await loginpage.login('Fail', 'some invalid password')
        await loginpage.snapshotErrorMessage()
    })
})


