const { Given, When, Then } = require("@cucumber/cucumber")
const LoginPage = require("../../page-objects/loginPage.po")

let loginPage

async function setupLoginPage(page) {
  loginPage = new LoginPage(page)
  await loginPage.navigateLogin()
  return loginPage
}

Given("I am on the Login page", { timeout: 100 * 1000 }, async function () {
  loginPage = await setupLoginPage(this.page)
})

Then(
  "I should see the {string} text",
  { timeout: 100 * 1000 },
  async function (heading) {
    await loginPage.verifyLoginText(heading)
  }
)

Then(
  "I should see an email error message {string}",
  { timeout: 100 * 1000 },
  async function (emailErrorMessage) {
    await loginPage.verifyEmailErrorMessage(emailErrorMessage)
  }
)

Then(
  "I should see a password error message {string}",
  { timeout: 100 * 1000 },
  async function (passwordErrorMessage) {
    await loginPage.verifyPasswordErrorMessage(passwordErrorMessage)
  }
)

When(
  "I enter valid email and password",
  { timeout: 100 * 1000 },
  async function () {
    await loginPage.enterValidCredential()
  }
)

When("I click on the login button", async function () {
  await loginPage.loginSubmit()
})

Then("I should be redirected to the Activity List page", async function () {
  await loginPage.navigateDashboard()
})

When("I click on the logout button", async function () {
  await loginPage.logout()
})
