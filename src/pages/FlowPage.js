// src/pages/FlowPage.js
class FlowPage {
    constructor(page) {
      this.page = page;
    }
  
    // Locators
    get sidebarNode() {
      return this.page.locator('text=Default Node');
    }
  
    get canvas() {
      return this.page.locator('.react-flow');
    }
  
    get node() {
      return this.page.locator('.react-flow__nodes');
    }
  
    get sidebarPartnerNode() {
      return this.page.locator('text=Partner Node');
    }
  
    get sidebarSponsorNode() {
      return this.page.locator('text=Sponsor Node');
    }
  
    // Actions
    async navigate() {
      await this.page.goto('http://localhost:3000');
    }
  
    async dragAndDropNode() {
      await this.sidebarNode.dragTo(this.canvas);
    }
  
    async checkNodeVisibility() {
      await this.page.waitForSelector('.react-flow__nodes');
    }
  
  }
  
  module.exports = FlowPage;
  