// src/tests/reactFlow.test.js
const { test, expect } = require('@playwright/test');
const FlowPage = require('../pages/FlowPage'); // Import the Page Object


test.describe('Check node is exist or not', () => {
  let flowPage;

  test.beforeEach(async ({ page }) => {
    flowPage = new FlowPage(page); // Initialize the Page Object
    await flowPage.navigate(); // Navigate to the page
  });

  test('Nodes should be visible', async () => {
    const sidebarPartnerNode = await flowPage.sidebarPartnerNode;
    await expect(sidebarPartnerNode).toBeVisible(); 
    const sidebarSponsorNode = await flowPage.sidebarSponsorNode;
    await expect(sidebarSponsorNode).toBeVisible();
  });
});

test.describe('React Flow Drag and Drop', () => {
  let flowPage;

  test.beforeEach(async ({ page }) => {
    flowPage = new FlowPage(page); // Initialize the Page Object
    await flowPage.navigate(); // Navigate to the page
  });

  test('should add a new node and connect it', async ({page}) => {
    // Find the "Add Node" button in the sidebar and drag it onto the canvas
    // await flowPage.dragAndDropNode();

    // // Check if a node is added to the canvas
    // const node = await flowPage.node;
    // await expect(node).toHaveCount(1); // We expect 1 node to be added

    await page.waitForSelector('.drag-container');
    await page.waitForSelector('.react-flow');
 
    // Take snapshot before drag
    await page.screenshot({ path: 'screenshots/before-drag.png' });
 
    // Drag the Partner Node
    const partnerNode = await page.locator('div[data-type="partner"]');
    const partnerNodeBoundingBox = await partnerNode.boundingBox();
    const reactFlowWrapper = await page.locator('.react-flow');
    const targetBoundingBox = await reactFlowWrapper.boundingBox();
 
    if (partnerNodeBoundingBox && targetBoundingBox) {
      const dragX = partnerNodeBoundingBox.x + partnerNodeBoundingBox.width / 2;
      const dragY = partnerNodeBoundingBox.y + partnerNodeBoundingBox.height / 2;
      const dropX = targetBoundingBox.x + targetBoundingBox.width / 2;
      const dropY = targetBoundingBox.y + targetBoundingBox.height / 2;
 
      await page.mouse.move(dragX, dragY);
      await page.mouse.down();
      await page.mouse.move(dropX, dropY);
      await page.mouse.up();
    }
 
    // Drag the Sponsor Node
    const sponsorNode = await page.locator('div[data-type="sponsor"]');
    const sponsorNodeBoundingBox = await sponsorNode.boundingBox();
 
    if (sponsorNodeBoundingBox && targetBoundingBox) {
      // Adjusting the position to move the Sponsor node further
      const dragX = sponsorNodeBoundingBox.x + sponsorNodeBoundingBox.width / 2;
      const dragY = sponsorNodeBoundingBox.y + sponsorNodeBoundingBox.height / 2;
      const dropX = targetBoundingBox.x + targetBoundingBox.width / 2 + 200;  // Change the X coordinate to adjust position
      const dropY = targetBoundingBox.y + targetBoundingBox.height / 2 + 50;   // Change the Y coordinate to adjust position
 
      await page.mouse.move(dragX, dragY);
      await page.mouse.down();
      await page.mouse.move(dropX, dropY);
      await page.mouse.up();
    }

      // Take snapshot after drag
      await page.screenshot({ path: 'screenshots/after-drag.png' });

      const edgeSource = await page.locator("(//div[@class='react-flow__handle react-flow__handle-bottom nodrag nopan source connectable connectablestart connectableend connectionindicator'])[1]");

      // Locate the target handle (mouse up here)
      const edgeTarget = await page.locator("(//div[@class='react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator'])[2]");
  
      // Get the bounding box of the source handle (for the mouse down)
      const sourceBox = await edgeSource.boundingBox();
      if (!sourceBox) throw new Error('Source handle not found');
  
      // Get the bounding box of the target handle (for the mouse up)
      const targetBox = await edgeTarget.boundingBox();
      if (!targetBox) throw new Error('Target handle not found');
  
      // Simulate mouse down at the source handle
      await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2); // Move to the center of the source handle
      await page.mouse.down(); // Mouse down to start the drag
  
      // Simulate mouse move towards the target handle
      await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2); // Move to the center of the target handle
  
      // Simulate mouse up at the target handle to drop the edge
      await page.mouse.up(); // Mouse up to drop the connection


      await page.screenshot({ path: 'screenshots/edges-connect.png' });

  });
});



