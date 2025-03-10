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
    this.logoutBtn = "#logoutBtn"
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

  async verifyEmailErrorMessage(emailErrorMessage) {
    const emailErrorLocator = this.page.locator(this.emailError)
    await emailErrorLocator.waitFor()
    const emailErrorContent = await emailErrorLocator.textContent()
    await this.page.waitForTimeout(1000)
    if (emailErrorContent.trim() !== emailErrorMessage) {
      throw new Error(
        `Expected heading to be "${emailErrorMessage}" but found "${emailErrorContent}"`
      )
    }
    await this.page.waitForTimeout(500)
  }

  async verifyPasswordErrorMessage(passwordErrorMessage) {
    const passwordErrorLocator = this.page.locator(this.passwordError)
    await passwordErrorLocator.waitFor()
    const passwordErrorContent = await passwordErrorLocator.textContent()
    await this.page.waitForTimeout(1000)
    if (passwordErrorContent.trim() !== passwordErrorMessage) {
      throw new Error(
        `Expected heading to be "${passwordErrorMessage}" but found "${passwordErrorContent}"`
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
    await this.page.waitForTimeout(1000)
  }

  async logout() {
    const logoutBtnLocator = this.page.locator(this.logoutBtn)
    await logoutBtnLocator.waitFor()
    await logoutBtnLocator.click()
    await this.page.waitForTimeout(1000)
  }
}

module.exports = LoginPage
