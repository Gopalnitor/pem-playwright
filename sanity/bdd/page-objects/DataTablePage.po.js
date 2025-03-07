class DataTablePage {
    constructor(page) {
        this.page = page;
        this.headingSelector = '.task-title'
        this.tableRowsSelector = 'table tbody tr';
        this.searchInputSelector = 'input[placeholder="Search by name..."]';
        this.statusDropdownSelector = '#filter-status';
        this.itemsPerPageDropdownSelector = '.cds--select-input';
        this.nextPageButtonSelector = 'button[aria-label="Next page"]';
        this.prevPageButtonSelector = 'button[aria-label="Previous page"]';
        this.overflowMenuSelector = 'tr:nth-child(1) .cds--overflow-menu__wrapper button';
        this.markAsFinalOptionSelector = '.cds--overflow-menu-options__option:has(.cds--overflow-menu-options__option-content:has-text("Mark as Final")) button';
        this.confirmModalSelector = '.cds--modal-container[aria-label="Confirm Action"]';
        this.confirmButtonSelector = '.cds--modal-footer .cds--btn--primary';
        this.cancelButtonSelector = '.cds--modal-footer .cds--btn--secondary';
    }

    async verifyPageHeading(expectedHeading) {
        const pageHeadingLocator = this.page.locator(this.headingSelector);
        await pageHeadingLocator.waitFor();
        const pageHeadingText = await pageHeadingLocator.textContent();
        await this.page.waitForTimeout(1000);
        if (pageHeadingText.trim() !== expectedHeading) {
            throw new Error(`Expected heading to be "${expectedHeading}" but found "${pageHeadingText}"`);
        }
        await this.page.waitForTimeout(500);
    }

    async search(searchQuery) {
        await this.page.fill(this.searchInputSelector, searchQuery);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(500);
        await this.page.screenshot({ path: `sanity/screenshots/search_${searchQuery}.png` });
    }

    async verifySearchResults(searchQuery) {
        const rows = await this.page.locator(this.tableRowsSelector);
        const resultsText = await rows.allTextContents();
        const found = resultsText.some(text => text.toLowerCase().includes(searchQuery.toLowerCase()));
        if (!found) {
            throw new Error(`No results found containing "${searchQuery}"`);
        }
        await this.page.waitForTimeout(500);
        await this.page.screenshot({ path: `sanity/screenshots/searchResults_${searchQuery}.png` });
    }

    async verifyTableMessage(message) {
        const messageText = await this.page.locator('table tbody tr td').textContent();
        if (messageText !== message) {
            throw new Error(`Expected message "${message}" but found "${messageText}"`);
        }
        await this.page.waitForTimeout(500);
    }

    async selectItemsPerPage(number) {
        await this.page.waitForSelector(this.itemsPerPageDropdownSelector);
        await this.page.selectOption(this.itemsPerPageDropdownSelector, number);
        await this.page.waitForTimeout(500);
    }

    async verifyItemsCount(expectedCount) {
        const rows = await this.page.locator(this.tableRowsSelector);
        const count = await rows.count();
        if (count !== expectedCount) {
            throw new Error(`Expected ${expectedCount} items displayed, but found ${count}`);
        }
        await this.page.waitForTimeout(500);
    }

    async clickNextPage() {
        await this.page.click(this.nextPageButtonSelector);
        await this.page.waitForTimeout(500);
        await this.page.screenshot({ path: `sanity/screenshots/clickNextPage.png` });
    }

    async clickPreviousPage() {
        await this.page.click(this.prevPageButtonSelector);
        await this.page.waitForTimeout(500);
        await this.page.screenshot({ path: `sanity/screenshots/clickPreviousPage.png` });
    }

    async selectStatusFilter(status) {
        await this.page.selectOption(this.statusDropdownSelector, status);
        await this.page.waitForTimeout(500);
        await this.page.screenshot({ path: `sanity/screenshots/selectStatusFilter_${status}.png` });
    }

    async verifyStatusFilterResults(status) {
        const rows = await this.page.locator(this.tableRowsSelector);
        const resultsText = await rows.allTextContents();
        const found = resultsText.some(text => text.toLowerCase().includes(status.toLowerCase()));
        if (!found) {
            throw new Error(`No results of status "${status}" found`);
        }
        await this.page.waitForTimeout(500);
    }

    async searchAndFilter(searchQuery, status) {
        await this.page.fill(this.searchInputSelector, searchQuery);
        await this.page.selectOption(this.statusDropdownSelector, status);
        await this.page.waitForTimeout(500);
        await this.page.screenshot({ path: `sanity/screenshots/searchAndFilter_${searchQuery}_${status}.png` });
    }

    async verifySearchAndFilterResults(searchQuery, status) {
        const rows = await this.page.locator(this.tableRowsSelector);
        const resultsText = await rows.allTextContents();
        const found = resultsText.some(text =>
            text.toLowerCase().includes(searchQuery.toLowerCase()) && text.toLowerCase().includes(status.toLowerCase())
        );
        if (!found) {
            throw new Error(`No results found containing "${searchQuery}" and of status "${status}"`);
        }
        await this.page.waitForTimeout(500);
        await this.page.screenshot({ path: `sanity/screenshots/verifySearchAndFilterResults_${searchQuery}_${status}.png` });
    }

    async openOverflowMenuForFirstItem() {
        await this.page.waitForSelector(this.tableRowsSelector, { timeout: 10000 });
        await this.page.click(this.overflowMenuSelector);
        await this.page.waitForSelector('.cds--overflow-menu-options--open', { timeout: 10000 });
        await this.page.waitForTimeout(500);
    }

    async selectMarkAsFinal() {
        await this.page.waitForSelector(this.markAsFinalOptionSelector, { timeout: 10000 });
        await this.page.click(this.markAsFinalOptionSelector);
        await this.page.waitForSelector(this.confirmModalSelector, { timeout: 10000 });
        await this.page.waitForTimeout(500);
        await this.page.screenshot({ path: 'sanity/screenshots/selectMarkAsFinal.png' });
    }

    async confirmAction() {
        await this.page.waitForSelector(this.confirmButtonSelector, { timeout: 10000 });
        await this.page.click(this.confirmButtonSelector);
        await this.page.waitForTimeout(500);
    }

    async verifyModalIsVisible() {
        const modalVisible = await this.page.isVisible(this.confirmModalSelector);
        if (!modalVisible) {
            throw new Error("Confirmation modal is not displayed.");
        }
        await this.page.waitForTimeout(500);
        await this.page.screenshot({ path: 'sanity/screenshots/verifyModalIsVisible.png' });
    }

    async cancelAction() {
        await this.page.waitForSelector(this.cancelButtonSelector, { timeout: 10000 });
        await this.page.click(this.cancelButtonSelector);
        await this.page.waitForTimeout(500);
    }

    async verifyActivityMarkedAsFinal() {
        const activityRowSelector = 'table tbody tr:nth-child(1)';
        await this.page.waitForSelector(activityRowSelector, { timeout: 10000 });
        const backgroundColor = await this.page.locator(activityRowSelector).evaluate((row) => {
            return window.getComputedStyle(row).backgroundColor;
        });
        if (backgroundColor === 'rgb(255, 255, 255)') {
            throw new Error("Activity was not marked as Final successfully.");
        }
        await this.page.waitForTimeout(500);
        await this.page.screenshot({ path: 'sanity/screenshots/verifyActivityMarkedAsFinal.png' });
    }

    async verifyActivityNotMarkedAsFinal() {
        const activityRowSelector = 'table tbody tr:nth-child(1)';
        const backgroundColor = await this.page.locator(activityRowSelector).evaluate((row) => {
            return window.getComputedStyle(row).backgroundColor;
        });
        if (backgroundColor !== 'rgb(255, 255, 255)') {
            throw new Error("Activity was marked as Final even after cancellation.");
        }
        await this.page.waitForTimeout(500);
        await this.page.screenshot({ path: 'sanity/screenshots/verifyActivityNotMarkedAsFinal.png' });
    }
}

module.exports = DataTablePage;