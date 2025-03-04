import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlowComponent from './FlowComponent';
import DataTablePage from './DataTable';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataTablePage />} />
        <Route path="/flow" element={<FlowComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
 