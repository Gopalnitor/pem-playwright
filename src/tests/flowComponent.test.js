// src/tests/reactFlow.test.js
const { test, expect } = require('@playwright/test');

test.describe('React Flow Drag and Drop', () => {
  test('should add a new node and connect it', async ({ page }) => {
    // Navigate to the localhost app
    await page.goto('http://localhost:3000');

    // Find the "Add Node" button in the sidebar and drag it onto the canvas
    const sidebarNode = await page.locator('text=Default Node');
    const canvas = await page.locator('.react-flow');

    // Perform the drag-and-drop action
    await sidebarNode.dragTo(canvas);

    // Check if a node is added to the canvas
    const node = await page.locator('.react-flow__nodes');
    //page.waitForTimeout(5000);
    await expect(node).toHaveCount(1); // We expect 1 node to be added

    // Optionally, check for handles (input/output)
    // const inputHandle = await page.locator('.react-flow__handle.react-flow__handle-top');
    // const outputHandle = await page.locator('.react-flow__handle.react-flow__handle-bottom');
    // await expect(inputHandle).toBeVisible();
    // await expect(outputHandle).toBeVisible();
  });
});

test.describe('Check node is exist or not', ()=> {
  test('Nodes should be visible', async ({page}) => {
    await page.goto('http://localhost:3000');
    const sidebarPartnerNode = await page.locator('text=Partner Node');
    await expect(sidebarPartnerNode).toBeVisible();

    const sidebarSponsorNode = await page.locator('text=Sponsor Node');
    await expect(sidebarSponsorNode).toBeVisible();
  });
})
