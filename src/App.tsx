import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DocumentManagementSystem from './components/Document-management-system/document-management-system';
import DocumentUploader from './components/create-document/document-uploader';
import DocumentVersionControl from './components/documentVersionControl/document-version-control';
import DocumentViewer from './components/document-viewer/document-viewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DocumentManagementSystem />} />
        <Route path="/upload" element={<DocumentUploader />} />
        <Route path="/version" element={<DocumentVersionControl/>} />
        <Route path="/view/:id/:versionId" element={<DocumentViewer />} />
      </Routes>
    </Router>
  );
}

export default App;