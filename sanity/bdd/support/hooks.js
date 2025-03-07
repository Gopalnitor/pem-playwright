const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

Before(async function ({ pickle }) {
    this.browser = await chromium.launch({ headless: false }); 

    this.testName = pickle.name.replace(/\W/g, '-');
    this.context = await this.browser.newContext({
      acceptDownloads: true,
      recordVideo: { dir: `./sanity/videos/${this.testName}` },
    });
  
    this.page = await this.context.newPage();
    await this.page.goto('http://localhost:3000');
});


After(async function () {
    await this.page.waitForTimeout(2000);
    await this.browser.close();
});
