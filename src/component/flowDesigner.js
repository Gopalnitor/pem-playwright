import React, { useCallback, useState, useRef, useEffect } from "react"
import ReactFlow, {
  Controls,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProvider,
} from "reactflow"
import "reactflow/dist/style.css"
import "../styles/workFlow.css"
import { v4 as uuidv4 } from "uuid"
import TaskTray from "./taskTray"
import Header from "./header"

const FlowDesigner = ({ onNodeClick, nodes, edges, setNodes, setEdges }) => {
  const [contextMenu, setContextMenu] = useState(null)
  const reactFlowWrapper = useRef(null)
  const resizeObserverRef = useRef(null)

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds))
  }, [])

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds))
  }, [])

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds))
  }, [])

  const onDrop = useCallback((event) => {
    event.preventDefault()
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const type = event.dataTransfer.getData("application/reactflow")

    if (typeof type === "undefined" || !reactFlowBounds) {
      return
    }

    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    }

    const newNode = {
      id: uuidv4(),
      type: type === "partner" ? "partner" : "sponsor",
      position,
      data: { label: `${type === "partner" ? "Partner" : "Sponsor"} Node` },
    }

    setNodes((nds) => nds.concat(newNode))
  }, [])

  const onDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }

  const handleNodeContextMenu = (event, nodeId) => {
    event.preventDefault()
    const { clientX, clientY } = event
    setContextMenu({
      visible: true,
      x: clientX,
      y: clientY,
      nodeId,
    })
  }

  const handleDeleteNode = () => {
    if (contextMenu) {
      setNodes((nds) => nds.filter((node) => node.id !== contextMenu.nodeId.id))
      setContextMenu(null)
    }
  }

  const handleClickOutside = (event) => {
    if (contextMenu && !event.target.closest(".context-menu")) {
      setContextMenu(null)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [contextMenu])

  useEffect(() => {
    if (reactFlowWrapper.current && !resizeObserverRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {})

      resizeObserverRef.current.observe(reactFlowWrapper.current)
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
    }
  }, [])

  return (
    <>
      <Header headerTitle={"New Activity"} title={"Task"} backNavigation />
      <TaskTray />

      <div
        style={{ height: "100vh", marginLeft: "73px" }}
        ref={reactFlowWrapper}
      >
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeContextMenu={handleNodeContextMenu}
            onNodeClick={onNodeClick}
          >
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>

        {contextMenu && (
          <div
            className="context-menu"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <ul>
              <li onClick={handleDeleteNode}>Delete Node</li>
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default FlowDesigner
