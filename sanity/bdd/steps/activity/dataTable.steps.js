const { Given, When, Then } = require('@cucumber/cucumber');
const DataTablePage = require('../../page-objects/dataTablePage.po');

let dataTablePage;

Given('I am on the List Page', async function () {
    dataTablePage = new DataTablePage(this.page);
    await dataTablePage.verifyPageHeading("Activity Definitions");
});

Then('I should see the {string} heading', async function (heading) {
    await dataTablePage.verifyPageHeading(heading);
});

When('I search for {string}', async function (searchQuery) {
    await dataTablePage.search(searchQuery);
});

Then('I should see results that contain {string}', async function (searchQuery) {
    await dataTablePage.verifySearchResults(searchQuery);
});

Then('I should see {string}', async function (message) {
    await dataTablePage.verifyTableMessage(message);
});

When('I select {string} from the items per page dropdown', async function (number) {
    await dataTablePage.selectItemsPerPage(number);
});

Then('I should see all available items displayed on the table', async function () {
    await dataTablePage.verifyItemsCount(15);
});

When('I click on the "Next page" button', async function () {
    await dataTablePage.clickNextPage();
});

Then('I should see results from the next page', async function () {
    await dataTablePage.verifyItemsCount(5);
});

When('I click on the "Previous page" button', async function () {
    await dataTablePage.clickPreviousPage();
});

Then('I should see the previous page items', async function () {
    await dataTablePage.verifyItemsCount(10);
});

When('I select {string} from the status filter dropdown', async function (status) {
    await dataTablePage.selectStatusFilter(status);
});

Then('I should see results of status {string}', async function (status) {
    await dataTablePage.verifyStatusFilterResults(status);
});

When('I search for {string} and select {string} from the status filter dropdown', async function (searchQuery, status) {
    await dataTablePage.searchAndFilter(searchQuery, status);
});

Then('I should see results containing {string} and of status {string}', async function (searchQuery, status) {
    await dataTablePage.verifySearchAndFilterResults(searchQuery, status);
});

When('I click on the overflow menu for the first activity', async function () {
    await dataTablePage.openOverflowMenuForFirstItem();
});

When('I select "Mark as Final" from the overflow menu', async function () {
    await dataTablePage.selectMarkAsFinal();
});

Then('A confirmation modal should appear', async function () {
    await dataTablePage.verifyModalIsVisible();
});

When('I confirm the action in the modal', async function () {
    await dataTablePage.confirmAction();
});

Then('The activity should be successfully marked as Final', async function () {
    await dataTablePage.verifyActivityMarkedAsFinal();
});

When('I cancel the action in the modal', async function () {
    await dataTablePage.cancelAction();
});

Then('The activity should not be marked as Final', async function () {
    await dataTablePage.verifyActivityNotMarkedAsFinal();
});