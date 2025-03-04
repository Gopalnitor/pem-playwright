// step_definitions/login/login.steps.js

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { Page } = require('playwright');

let page; // Playwright Page object

// Setup: Navigate to the login page
Given('I am on the login page', async function () {
  page = this.page; // Assuming that page is provided through context
  await page.goto('http://localhost:3000/login'); // Adjust the URL accordingly
});

// When: Entering username and password
When('I enter my credentials', async function () {
  const usernameInput = await page.locator('input[name="username"]');
  const passwordInput = await page.locator('input[name="password"]');
  await usernameInput.fill('myusername'); // Replace with a real username
  await passwordInput.fill('mypassword'); // Replace with a real password
  const loginButton = await page.locator('button[type="submit"]');
  await loginButton.click();
});

// Then: Verifying successful login and redirection
Then('I should be redirected to the dashboard', async function () {
  await expect(page).toHaveURL('http://localhost:3000/dashboard'); // Adjust the URL as needed
});
