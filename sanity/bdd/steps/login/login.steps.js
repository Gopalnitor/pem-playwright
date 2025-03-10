const { Given, When, Then } = require("@cucumber/cucumber")
const LoginPage = require("../../page-objects/loginPage.po")

let loginPage

Given("I am on the Login Page", async function () {
  loginPage = new LoginPage(this.page)
  await loginPage.verifyLoginText("Login")
})

Then("I should see the {string} text", async function (heading) {
  await loginPage.verifyLoginText(heading)
})
