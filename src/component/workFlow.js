import React, { useState } from "react"
import FlowDesigner from "./flowDesigner"
import { Panel, PanelGroup } from "react-resizable-panels"

import NodeDefinitionForm from "./nodeDefinitionForm"
const initialEdges = []
const initialNodes = [];

function Workflow() {
  const [showForm, setShowForm] = useState(false)
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const onNodeClickHandler = (event, node) => {
    let newNodes = nodes;
    const oldNode = JSON.parse(JSON.stringify(node));
    if(node.groupType){
        if (node.data.displayOption.minimized) {
          node.data.displayOption.minimized = false;
          newNodes = [...nodes, ...node.data.children];
        }

        if (!oldNode.data.displayOption.minimized) {
          node.data.displayOption.minimized = true;
          newNodes = nodes.filter((child) => !node.data.children.some((item) => item.id === child.id));
        }
        setNodes(newNodes);
    }else {
      setShowForm(true);
    }
  }

  return (
    <div>
      <PanelGroup
        direction="horizontal"
        id="group"
        defaultSize={100}
        minSize={70}
      >
        <Panel id="left-panel">
          <FlowDesigner onNodeClick={onNodeClickHandler} nodes = {nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
        </Panel>
        {/* <PanelResizeHandle id="resize-handle" /> */}
        {showForm && (
          <Panel id="right-panel" defaultSize={30} minSize={20} maxSize={30}>
            <NodeDefinitionForm onClose={() => setShowForm(false)} />
          </Panel>
        )}
      </PanelGroup>
    </div>
  )
}

export default Workflow
