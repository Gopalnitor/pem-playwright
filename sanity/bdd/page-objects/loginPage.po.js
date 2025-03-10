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

  async navigateLogin() {
    await this.page.goto("http://localhost:3000")
  }

  async navigateDashboard() {
    await this.page.goto("http://localhost:3000/dashboard")
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

  async enterValidCredential() {
    const emailLocator = this.page.locator(this.userEmail)
    const passwordLocator = this.page.locator(this.password)
    await emailLocator.fill("sponser@gmail.com")
    await passwordLocator.fill("Sponsor@123")
    await this.page.waitForTimeout(1000)
  }

  async loginSubmit() {
    const signInBtnLocator = this.page.locator(this.signInBtn)
    await signInBtnLocator.waitFor()
    await signInBtnLocator.click()
  }
}

module.exports = LoginPage
