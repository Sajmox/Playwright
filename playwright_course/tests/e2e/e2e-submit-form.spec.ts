import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe.skip('Feedback Form', () => {
    let feedbackPage: FeedbackPage
    let homePage: HomePage
    test.beforeEach(async ({ page }) => {
        feedbackPage = new FeedbackPage(page)
        homePage = new HomePage(page)
        await homePage.visit()
        await homePage.clickOnFeedbackLink()
    })

    // Reset feedback form
    test('Reset feedback form', async ({ page }) => {
        await feedbackPage.fillForm(
            'name', 
            'email@mail.com', 
            'subject', 
            'my awesome message'
            )
        await feedbackPage.resetForm()
        await feedbackPage.assertReset()

    })
    // Submit feedback form
    test('Submit feedback form', async ({ page }) => {
        await feedbackPage.fillForm(
            'name', 
            'email@mail.com', 
            'subject', 
            'my awesome message'
            )
        await feedbackPage.submitForm()
        await feedbackPage.feedbackFormSent()
    })
})




