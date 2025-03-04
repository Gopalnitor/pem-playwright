const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');


// Before hook - Initializes browser and page before each scenario
Before(async function () {
    this.browser = await chromium.launch({ headless: false });  // Set to true for headless mode
    this.page = await this.browser.newPage();
    await this.page.goto('http://localhost:3000');  // Replace with your app's URL
});

// After hook - Closes the browser after each scenario
After(async function () {
    await this.page.waitForTimeout(2000);
    await this.browser.close();
});
