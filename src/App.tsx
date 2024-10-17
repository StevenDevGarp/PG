import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DocumentManagementSystem from './components/Document-management-system/document-management-system';
import DocumentUploader from './components/create-document/document-uploader';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DocumentManagementSystem />} />
        <Route path="/upload" element={<DocumentUploader />} />
      </Routes>
    </Router>
  );
}

export default App;