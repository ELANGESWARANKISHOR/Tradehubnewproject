import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Corrected import path

// The main App component that sets up the router
// and defines the routes for the application.
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* You can add more routes for other pages here */}
      </Routes>
    </Router>
  );
};

export default App;
