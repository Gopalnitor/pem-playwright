const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const FlowPage = require('../../../src/pages/FlowPage');

let flowPage;

async function setupFlowPage(page) {
  flowPage = new FlowPage(page);
  await flowPage.navigateFlow();
  return flowPage;
}

// Given('I am on the List Page', { timeout: 100 * 1000 }, async function () {
//   await this.page.goto('http://localhost:3000');
// });

When('I click the "New" button', { timeout: 100 * 1000 }, async function () {
  await this.page.click('button:has-text("New")');
});

Then('I should be redirected to the FlowComponent page', { timeout: 100 * 1000 }, async function () {
  await expect(this.page).toHaveURL('http://localhost:3000/flow');
});

Given('I am on the FlowComponent page', { timeout: 100 * 1000 }, async function () {
  flowPage = await setupFlowPage(this.page);
});

Then('I should see the Partner Node in the sidebar', async function () {
  await expect(flowPage.sidebarPartnerNode).toBeVisible({ timeout: 5000 });
});

Then('I should see the Sponsor Node in the sidebar', async function () {
  await expect(flowPage.sidebarSponsorNode).toBeVisible({ timeout: 5000 });
});

Then('I should see the canvas', async function () {
  await expect(flowPage.canvas).toBeVisible();
});

When('I drag and drop the Partner Node on the canvas', {timeout: 100*1000}, async function () {
  await flowPage.dragAndDropNode(flowPage.sidebarPartnerNode, 'partner', 50, 20);
});

Then('the Partner Node should be visible on the canvas', async function () {
  await expect(flowPage.canvas.locator('.react-flow__node')).toBeVisible();
});

When('I drag and drop the Sponsor Node on the canvas', async function () {
  await flowPage.dragAndDropNode(flowPage.sidebarSponsorNode, 'sponsor', 300, 100);
});

Then('the Sponsor Node should be visible on the canvas', {timeout: 100*1000}, async function () {
  await expect(flowPage.canvas.locator('.react-flow__node')).toBeVisible();
});

When('I connect the Partner Node and the Sponsor Node', async function () {
  await flowPage.connectNodes();
});

Then('an edge should appear between the nodes', async function () {
  await expect(flowPage.canvas.locator('.react-flow__edge')).toHaveCount(1);
});

When('I delete the Partner Node', async function () {
  await flowPage.deleteNode();
});

Then('the Partner Node should be removed from the canvas', async function () {
  await expect(flowPage.canvas.locator('.react-flow__node')).toHaveCount(0);
});

When('I delete the Partner Node from the connected nodes', async function () {
  await flowPage.deleteNode(0);  // Delete the first node (Partner Node)
});

Then('the edge should be removed', async function () {
  await expect(flowPage.canvas.locator('.react-flow__edge')).toHaveCount(0);
});

When('I zoom in using the zoom-in shortcut', async function () {
  await this.page.keyboard.press('Control+Equal');
});

Then('the viewport should be zoomed in', async function () {
  const zoomedInContainer = flowPage.viewport;
  expect(await zoomedInContainer.evaluate((node) => node.style.transform)).toContain('scale');
});

When('I zoom out using the zoom-out shortcut', async function () {
  await this.page.keyboard.press('Control+Minus');
});

Then('the viewport should be zoomed out', async function () {
  const zoomedOutContainer = flowPage.viewport;
  expect(await zoomedOutContainer.evaluate((node) => node.style.transform)).toContain('scale');
});
