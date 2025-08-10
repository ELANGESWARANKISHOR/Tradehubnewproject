import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import UserRegistration from './pages/user/UserRegistration';
import SellerRegistration from './pages/seller/SellerRegistration';
import './App.css'; 
import HomePage from './pages/user/HomePage';
import BrowserPage from './pages/user/Browserpage';
import ProductOfferPage from './pages/user/ProductOfferPage';
import CartPage from './pages/user/CartPage';
import AccountPage from './pages/user/AccountPage';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup-buyer" element={<UserRegistration />} />
        <Route path="/signup-seller" element={<SellerRegistration />} />
        <Route path="/user-dashboard" element={<HomePage />} />
        <Route path="/browser" element={<BrowserPage />} />
        <Route path="/orders" element={<ProductOfferPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/logout" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;


