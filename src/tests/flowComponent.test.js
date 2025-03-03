const { test, expect } = require('@playwright/test');
const FlowPage = require('../pages/FlowPage');

test.describe('Check node visibility', () => {
  let flowPage;

  test.beforeEach(async ({ page }) => {
    flowPage = new FlowPage(page);
    await flowPage.navigate();
  });

  test('Sidebar Partner Node should be visible', async () => {
    await expect(flowPage.sidebarPartnerNode).toBeVisible();
  });

  test('Sidebar Sponsor Node should be visible', async () => {
    await expect(flowPage.sidebarSponsorNode).toBeVisible();
  });

  test('should render React Flow canvas and make it visible', async () => {
    await expect(flowPage.canvas).toBeVisible();
  });
});

test.describe('React Flow Drag and Drop', () => {
  let flowPage;

  test.beforeEach(async ({ page }) => {
    flowPage = new FlowPage(page);
    await flowPage.navigate();
  });

  test('should drag and drop the Partner Node', async () => {
    await flowPage.dragAndDropNode(flowPage.sidebarPartnerNode, 'partner');
  });

  test('should drag and drop the Sponsor Node', async () => {
    await flowPage.dragAndDropNode(flowPage.sidebarSponsorNode, 'sponsor');
  });
});

test.describe('Connect nodes with edge', () => {
  let flowPage;

  test.beforeEach(async ({ page }) => {
    flowPage = new FlowPage(page);
    await flowPage.navigate();
  });

  test('should connect the Partner Node and Sponsor Node with an edge', async () => {
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
    await expect(page.locator('.react-flow__node')).toBeVisible();
    await flowPage.deleteNode();
    await expect(page.locator('.react-flow__node')).toHaveCount(0);
  });
});

test.describe('Edge Visibility After Node Deletion', () => {
  let flowPage;

  test.beforeEach(async ({ page }) => {
    flowPage = new FlowPage(page);
    await flowPage.navigate();
  });

  test('should remove edge when one of the connected nodes is deleted', async ({ page }) => {
    await flowPage.dragAndDropNode(flowPage.sidebarPartnerNode, 'partner', 50, 20);
    await flowPage.dragAndDropNode(flowPage.sidebarSponsorNode, 'sponsor', 300, 100);
    await flowPage.connectNodes();

    await expect(page.locator('.react-flow__edge')).toHaveCount(1);

    await flowPage.deleteNode(0);

    await expect(page.locator('.react-flow__edge')).toHaveCount(0);
  });
});

test.describe('React Flow Zoom and Pan', () => {
  let flowPage;

  test.beforeEach(async ({ page }) => {
    flowPage = new FlowPage(page);
    await flowPage.navigate();
  });

  test('should zoom in using the zoom-in shortcut (Control+Equal)', async ({ page }) => {
    await page.keyboard.press('Control+Equal');
    const zoomedInContainer = flowPage.viewport;
    expect(await zoomedInContainer.evaluate((node) => node.style.transform)).toContain('scale');
  });

  test('should zoom out using the zoom-out shortcut (Control+Minus)', async ({ page }) => {
    await page.keyboard.press('Control+Minus');
    const zoomedOutContainer = flowPage.viewport;
    expect(await zoomedOutContainer.evaluate((node) => node.style.transform)).toContain('scale');
  });
});