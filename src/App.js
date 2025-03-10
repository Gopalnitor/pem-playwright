import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import DataTablePage from "./component/dataTable"
import WorkFlow from "./component/workFlow"
import LoginForm from "./component/loginForm"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<DataTablePage />} />
        <Route path="/flow" element={<WorkFlow />} />
      </Routes>
    </Router>
  )
}

export default App
