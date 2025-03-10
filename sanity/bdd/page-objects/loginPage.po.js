//flowPage.js

class LoginPage {
  constructor(page) {
    this.page = page
    this.loginText = "#login-text"
    this.userEmail = "#email"
    this.password = "#password"
    this.signInBtn = "#signInBtn"
    this.emailError = "#email-error-msg"
    this.passwordError = "#password-error-msg"
  }

  async verifyLoginText(expectedText) {
    const loginTextLocator = this.page.locator(this.loginText)
    await loginTextLocator.waitFor()
    const loginTextContent = await loginTextLocator.textContent()
    await this.page.waitForTimeout(1000)
    if (loginTextContent.trim() !== expectedText) {
      throw new Error(
        `Expected heading to be "${expectedText}" but found "${loginTextContent}"`
      )
    }
    await this.page.waitForTimeout(500)
  }
}

module.exports = LoginPage
