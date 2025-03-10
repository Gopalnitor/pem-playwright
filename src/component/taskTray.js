import React from "react"
import { Partnership, User } from "@carbon/icons-react"
import "../styles/workFlow.css"

const TaskTray = () => {
  return (
    <div className="drag-container">
      <div className="partner-block">
        <div
          className="draggable partner-node"
          data-type="partner"
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData("application/reactflow", "partner")
          }}
          title="Partner"
        >
          <Partnership />
        </div>
        <span className="name-block">Partner</span>
      </div>
      <div>
        <div
          className="draggable sponsor-node"
          data-type="sponsor"
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData("application/reactflow", "sponsor")
          }}
          title="Sponsor"
        >
          <User />
        </div>
        <span className="name-block">Sponsor</span>
      </div>
    </div>
  )
}

export default TaskTray
