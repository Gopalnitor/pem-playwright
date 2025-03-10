import React, { useState } from "react"
import FlowDesigner from "./flowDesigner"
import { Panel, PanelGroup } from "react-resizable-panels"

import NodeDefinitionForm from "./nodeDefinitionForm"

function Workflow() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div>
      <PanelGroup
        direction="horizontal"
        id="group"
        defaultSize={100}
        minSize={70}
      >
        <Panel id="left-panel">
          <FlowDesigner onNodeClick={() => setShowForm(true)} />
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
