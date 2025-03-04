const { test, expect } = require('@playwright/test');
const FlowPage = require('../pages/FlowPage');

async function setupFlowPage(page) {
  const flowPage = new FlowPage(page);
  await flowPage.navigateFlow();
  return flowPage;
}

test.describe('Test FlowComponent when "New" Button is Clicked from List Page', () => {
  let flowPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should navigate to FlowComponent when clicking the "New" button', async ({ page }) => {
    await page.click('button:has-text("New")');
    await expect(page).toHaveURL('http://localhost:3000/flow');
  });

  test('should verify nodes and canvas visibility after navigation to FlowComponent', async ({ page }) => {
    flowPage = await setupFlowPage(page);
    await expect(flowPage.sidebarPartnerNode).toBeVisible({ timeout: 5000 });
    await expect(flowPage.sidebarSponsorNode).toBeVisible({ timeout: 5000 });
    await expect(flowPage.canvas).toBeVisible();
  });

  test('should drag and drop the Partner Node on the canvas', async ({ page }) => {
    flowPage = await setupFlowPage(page);
    await flowPage.dragAndDropNode(flowPage.sidebarPartnerNode, 'partner');
  });

  test('should drag and drop the Sponsor Node on the canvas', async ({ page }) => {
    flowPage = await setupFlowPage(page);
    await flowPage.dragAndDropNode(flowPage.sidebarSponsorNode, 'sponsor');
  });

  test('should connect Partner Node and Sponsor Node with an edge', async ({ page }) => {
    flowPage = await setupFlowPage(page);
    await flowPage.dragAndDropNode(flowPage.sidebarPartnerNode, 'partner', 50, 20);
    await flowPage.dragAndDropNode(flowPage.sidebarSponsorNode, 'sponsor', 300, 100);
    await flowPage.connectNodes();
  });

  test('should delete a node when the "Delete Node" option is clicked in the context menu', async ({ page }) => {
    flowPage = await setupFlowPage(page);
    await flowPage.dragAndDropNode(flowPage.sidebarPartnerNode, 'partner');
    await expect(page.locator('.react-flow__node')).toBeVisible();
    await flowPage.deleteNode();
    await expect(page.locator('.react-flow__node')).toHaveCount(0);
  });

  test('should remove edge when one of the connected nodes is deleted', async ({ page }) => {
    flowPage = await setupFlowPage(page);
    await flowPage.dragAndDropNode(flowPage.sidebarPartnerNode, 'partner', 50, 20);
    await flowPage.dragAndDropNode(flowPage.sidebarSponsorNode, 'sponsor', 300, 100);
    await flowPage.connectNodes();
    await expect(page.locator('.react-flow__edge')).toHaveCount(1);
    await flowPage.deleteNode(0);
    await expect(page.locator('.react-flow__edge')).toHaveCount(0);
  });

  test('should zoom in using the zoom-in shortcut (Control+Equal)', async ({ page }) => {
    flowPage = await setupFlowPage(page);
    await page.keyboard.press('Control+Equal');
    const zoomedInContainer = flowPage.viewport;
    expect(await zoomedInContainer.evaluate((node) => node.style.transform)).toContain('scale');
  });

  test('should zoom out using the zoom-out shortcut (Control+Minus)', async ({ page }) => {
    flowPage = await setupFlowPage(page);
    await page.keyboard.press('Control+Minus');
    const zoomedOutContainer = flowPage.viewport;
    expect(await zoomedOutContainer.evaluate((node) => node.style.transform)).toContain('scale');
  });
});
 