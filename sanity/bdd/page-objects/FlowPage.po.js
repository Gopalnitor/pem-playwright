//flowPage.js

class FlowPage {
  constructor(page) {
    this.page = page
  }

  get sidebarPartnerNode() {
    return this.page.locator(".drag-container .draggable.partner-node") // Selects the Partner Node by its class
  }

  get sidebarSponsorNode() {
    return this.page.locator(".drag-container .draggable.sponsor-node") // Selects the Sponsor Node by its class
  }

  get canvas() {
    return this.page.locator(".react-flow")
  }

  get edgeSource() {
    return this.page.locator(
      "(//div[@class='react-flow__handle react-flow__handle-bottom nodrag nopan source connectable connectablestart connectableend connectionindicator'])[1]"
    )
  }

  get edgeTarget() {
    return this.page.locator(
      "(//div[@class='react-flow__handle react-flow__handle-top nodrag nopan target connectable connectablestart connectableend connectionindicator'])[2]"
    )
  }

  get viewport() {
    return this.page.locator(".react-flow__viewport")
  }

  async navigateList() {
    await this.page.goto("http://localhost:3000")
  }

  async navigateFlow() {
    await this.page.goto("http://localhost:3000/flow")
  }

  async dragAndDropNode(nodeLocator, nodeType, dropXNode = 0, dropYNode = 0) {
    await this.page.waitForSelector(".react-flow")
    await this.page.screenshot({
      path: `sanity/screenshots/before-${nodeType}-drag.png`,
    })

    const nodeBoundingBox = await nodeLocator.boundingBox()
    const reactFlowWrapper = this.canvas
    const targetBoundingBox = await reactFlowWrapper.boundingBox()
    await this.page.waitForTimeout(500)

    if (nodeBoundingBox && targetBoundingBox) {
      const dragX = nodeBoundingBox.x + nodeBoundingBox.width / 2
      const dragY = nodeBoundingBox.y + nodeBoundingBox.height / 2
      const dropX =
        targetBoundingBox.x + targetBoundingBox.width / 2 + (dropXNode || 0)
      const dropY =
        targetBoundingBox.y + targetBoundingBox.height / 2 + (dropYNode || 0)

      await this.page.mouse.move(dragX, dragY)
      await this.page.mouse.down()
      await this.page.waitForTimeout(500)
      await this.page.mouse.move(dropX, dropY)
      await this.page.mouse.up()
    }

    await this.page.screenshot({
      path: `sanity/screenshots/after-${nodeType}-drag.png`,
    })
  }

  async connectNodes() {
    const edgeSourceBox = await this.edgeSource.boundingBox()
    const edgeTargetBox = await this.edgeTarget.boundingBox()

    if (!edgeSourceBox || !edgeTargetBox)
      throw new Error("Edge source or target not found")
    await this.page.waitForTimeout(500)
    await this.page.mouse.move(
      edgeSourceBox.x + edgeSourceBox.width / 2,
      edgeSourceBox.y + edgeSourceBox.height / 2
    )
    await this.page.mouse.down()
    await this.page.waitForTimeout(500)
    await this.page.mouse.move(
      edgeTargetBox.x + edgeTargetBox.width / 2,
      edgeTargetBox.y + edgeTargetBox.height / 2
    )
    await this.page.mouse.up()

    await this.page.screenshot({ path: "sanity/screenshots/edges-connect.png" })
  }

  async deleteNode(nodeIndex = 0) {
    const node = await this.page.locator(".react-flow__node").nth(nodeIndex)

    await node.hover()
    await node.click({ button: "right" })
    await this.page.waitForTimeout(500)
    const deleteOption = this.page.locator(".context-menu li", {
      hasText: "Delete Node",
    })
    await this.page.waitForTimeout(500)
    await deleteOption.click()

    await this.page.waitForTimeout(500)
  }
}

module.exports = FlowPage
