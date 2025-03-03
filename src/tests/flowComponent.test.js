//flowComponent.test.js
const { test, expect } = require('@playwright/test');
const FlowPage = require('../pages/FlowPage'); // Import the Page Object

test.describe('Check node visibility', () => {
  let flowPage;

  test.beforeEach(async ({ page }) => {
    flowPage = new FlowPage(page); // Initialize the Page Object
    await flowPage.navigate(); // Navigate to the page
  });

  test('Sidebar Partner Node should be visible', async () => {
    const sidebarPartnerNode = flowPage.sidebarPartnerNode;
    await expect(sidebarPartnerNode).toBeVisible();
  });

  test('Sidebar Sponsor Node should be visible', async () => {
    const sidebarSponsorNode = flowPage.sidebarSponsorNode;
    await expect(sidebarSponsorNode).toBeVisible();
  });
});

test.describe('React Flow Drag and Drop', () => {
  let flowPage;

  test.beforeEach(async ({ page }) => {
    flowPage = new FlowPage(page); // Initialize the Page Object
    await flowPage.navigate(); // Navigate to the page
  });

  test('should drag and drop the Partner Node', async ({ page }) => {
    await flowPage.dragAndDropNode(flowPage.sidebarPartnerNode, 'partner');
  });

  test('should drag and drop the Sponsor Node', async ({ page }) => {
    await flowPage.dragAndDropNode(flowPage.sidebarSponsorNode, 'sponsor');
  });
});

test.describe('Connect nodes with edge', () => {
  let flowPage;

  test.beforeEach(async ({ page }) => {
    flowPage = new FlowPage(page); // Initialize the Page Object
    await flowPage.navigate(); // Navigate to the page
  });

  test('should connect the Partner Node and Sponsor Node with an edge', async ({ page }) => {
    await flowPage.dragAndDropNode(flowPage.sidebarPartnerNode, 'partner', 50, 20);
    await flowPage.dragAndDropNode(flowPage.sidebarSponsorNode, 'sponsor', 300, 100);
    await flowPage.connectNodes();
  });
});

test.describe('Delete Node', () => {
  let flowPage;

  test.beforeEach(async ({ page }) => {
    flowPage = new FlowPage(page);
    await flowPage.navigate();
  });

  test('should delete a node when the "Delete Node" option is clicked in the context menu', async ({ page }) => {
    await flowPage.dragAndDropNode(flowPage.sidebarPartnerNode, 'partner');

    const node = await page.locator('.react-flow__node');
    await expect(node).toBeVisible();

    await flowPage.deleteNode();

    const nodesAfterDelete = await page.locator('.react-flow__node');
    await expect(nodesAfterDelete).toHaveCount(0);
  });
});
 