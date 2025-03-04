const { Given, When, Then } = require('@cucumber/cucumber');


Given('I am on the List Page', async function () {
    const pageHeading = await this.page.textContent('h3');
    const heading = "Activity List";
    if (pageHeading !== heading) {
        throw new Error(`Expected heading to be "${heading}" but found "${pageHeading}"`);
    }
})

Then('I should see the {string} heading', {timeout: 100*1000}, async function (heading) {
    const pageHeading = await this.page.textContent('h3');
    if (pageHeading !== heading) {
        throw new Error(`Expected heading to be "${heading}" but found "${pageHeading}"`);
    }
});

When('I search for {string}', {timeout: 100*1000}, async function (searchQuery) {
    await this.page.fill('input[placeholder="Search by name..."]', searchQuery);
    await this.page.keyboard.press('Enter');  // Submit the search query
});

Then('I should see results that contain {string}', async function (searchQuery) {
    const rows = await this.page.locator('table tbody tr');
    const resultsText = await rows.allTextContents();

    const found = resultsText.some(text => text.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!found) {
        throw new Error(`No results found containing "${searchQuery}"`);
    }
});

When('I click on the "New" button', async function () {
    await this.page.click('button'); // Adjust selector if necessary
});

Then('I should be redirected to the {string} page', async function (url) {
    const currentUrl = this.page.url();
    if (!currentUrl.includes(url)) {
        throw new Error(`Expected to be redirected to "${url}" but found "${currentUrl}"`);
    }
});