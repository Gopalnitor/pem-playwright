import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DataTablePage from './Component/DataTable/DataTable';
import WorkFlow from './Component/FlowDesigner/WorkFlow';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataTablePage />} />
        <Route path="/flow" element={<WorkFlow />} />
      </Routes>
    </Router>
  );
}

export default App;
 