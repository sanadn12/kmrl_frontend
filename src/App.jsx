import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './components/Dashboard/Dashboard';
import UploadForm from './pages/Upload';
import Navbar from './components/Navbar/Navbar';

const AppWrapper = ({ documents, addDocument }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/'; // hide navbar on login

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard documents={documents} />} />
        <Route path="/upload" element={<UploadForm addDocument={addDocument} />} />
        {/* Redirect any unknown route to login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

const App = () => {
  const [documents, setDocuments] = useState([
    { id: 1, title: "Safety Bulletin", type: "HR", date: "2025-09-15" },
    { id: 2, title: "Maintenance Report", type: "Engineering", date: "2025-09-14" },
    { id: 3, title: "Contract Approval", type: "Finance", date: "2025-09-13" },
    { id: 4, title: "New HR Policy", type: "HR", date: "2025-09-12" },
    { id: 5, title: "Depot Expansion Plan", type: "Engineering", date: "2025-09-11" },
    { id: 6, title: "Legal Compliance Update", type: "Legal", date: "2025-09-10" },
    { id: 7, title: "Annual Budget Report", type: "Finance", date: "2025-09-09" },
    { id: 8, title: "Environmental Impact Study", type: "Engineering", date: "2025-09-08" },
    { id: 9, title: "Staff Training Schedule", type: "HR", date: "2025-09-07" },
    { id: 10, title: "Incident Report Q3", type: "Engineering", date: "2025-09-06" },
  ]);

  const addDocument = (doc) => {
    setDocuments([...documents, { ...doc, id: Date.now() }]);
  };

  return (
    <Router>
      <AppWrapper documents={documents} addDocument={addDocument} />
    </Router>
  );
};

export default App;
