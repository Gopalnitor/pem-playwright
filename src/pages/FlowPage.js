//FlowPage.js
class FlowPage {
  constructor(page) {
    this.page = page;
  }

  // Locators
  get sidebarPartnerNode() {
    return this.page.locator('text=Partner Node');
  }

  get sidebarSponsorNode() {
    return this.page.locator('text=Sponsor Node');
  }

  get canvas() {
    return this.page.locator('.react-flow');
  }

  get edgeSource() {
    return this.page.locator("(//div[@class='react-flow__handle react-flow__handle-bottom nodrag nopan source connectable connectablestart connectableend connectionindicator'])[1]");
  }

  get edgeTarget() {
    return this.page.locator("(//div[@class='react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator'])[2]");
  }

  // Actions
  async navigate() {
    await this.page.goto('http://localhost:3000');
  }

  async dragAndDropNode(nodeLocator, nodeType, dropXNode = 0, dropYNode = 0) {
    // Wait for selectors
    await this.page.waitForSelector('.react-flow');

    // Take snapshot before drag
    await this.page.screenshot({ path: `screenshots/before-${nodeType}-drag.png` });

    const nodeBoundingBox = await nodeLocator.boundingBox();
    const reactFlowWrapper = this.canvas;
    const targetBoundingBox = await reactFlowWrapper.boundingBox();

    if (nodeBoundingBox && targetBoundingBox) {
      const dragX = nodeBoundingBox.x + nodeBoundingBox.width / 2;
      const dragY = nodeBoundingBox.y + nodeBoundingBox.height / 2;
      const dropX = targetBoundingBox.x + targetBoundingBox.width / 2 + (dropXNode || 0);
      const dropY = targetBoundingBox.y + targetBoundingBox.height / 2 + (dropYNode || 0);

      await this.page.mouse.move(dragX, dragY);
      await this.page.mouse.down();
      await this.page.mouse.move(dropX, dropY);
      await this.page.mouse.up();
    }

    // Take snapshot after drag
    await this.page.screenshot({ path: `screenshots/after-${nodeType}-drag.png` });
  }

  async connectNodes() {
    const edgeSourceBox = await this.edgeSource.boundingBox();
    const edgeTargetBox = await this.edgeTarget.boundingBox();

    if (!edgeSourceBox || !edgeTargetBox) throw new Error('Edge source or target not found');

    // Simulate mouse down at the source handle
    await this.page.mouse.move(edgeSourceBox.x + edgeSourceBox.width / 2, edgeSourceBox.y + edgeSourceBox.height / 2); // Move to the center of the source handle
    await this.page.mouse.down();
    await this.page.mouse.move(edgeTargetBox.x + edgeTargetBox.width / 2, edgeTargetBox.y + edgeTargetBox.height / 2); // Move to the center of the target handle
    await this.page.mouse.up();

    // Take snapshot after connection
    await this.page.screenshot({ path: 'screenshots/edges-connect.png' });
  }

  // New method to delete a node
  async deleteNode() {
    const node = await this.page.locator('.react-flow__node');
    
    // Right-click on the node to open the context menu
    await node.hover();
    await node.click({ button: 'right' });

    // Click "Delete Node" from the context menu
    const deleteOption = this.page.locator('.context-menu li', { hasText: 'Delete Node' });
    await deleteOption.click();

    // Wait for the node to be deleted
    await this.page.waitForTimeout(500); // Optional, can be adjusted
  }

}

module.exports = FlowPage;