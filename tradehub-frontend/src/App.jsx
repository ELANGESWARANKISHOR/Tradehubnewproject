import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import './App.css'; // Optional: Add a general app-wide stylesheet

// This is the main App component that sets up the router
// and defines the routes for the entire application.
const App = () => {
  return (
    <Router>
      <Routes>
        {/* The root path "/" loads the LandingPage component */}
        <Route path="/" element={<LandingPage />} />
        
        {/* The "/login" path loads the LoginPage component */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* You can add more routes for other pages here,
            for example, a signup page. */}
      </Routes>
    </Router>
  );
};

export default App;
