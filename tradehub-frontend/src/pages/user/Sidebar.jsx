import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';

const Sidebar = () => {
  const location = useLocation();
  const activePage = location.pathname;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Welcome!</h1>
        <nav className="sidebar-nav">
          <Link to="/user-dashboard" className={`nav-item ${activePage === '/' ? 'active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
            </svg>
            <span className="nav-text">Home</span>
          </Link>
          <Link to="/browser" className={`nav-item ${activePage.startsWith('/browser') ? 'active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" fill="currentColor" viewBox="0 0 256 256">
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
            </svg>
            <span className="nav-text">Browser</span>
          </Link>
          <Link to="/orders" className={`nav-item ${activePage.startsWith('/orders') ? 'active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" fill="currentColor" viewBox="0 0 256 256">
              <path d="M72,104a8,8,0,0,1,8-8h96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,104Zm8,40h96a8,8,0,0,0,0-16H80a8,8,0,0,0,0,16ZM232,56V208a8,8,0,0,1-11.58,7.15L192,200.94l-28.42,14.21a8,8,0,0,1-7.16,0L128,200.94,99.58,215.15a8,8,0,0,1-7.16,0L64,200.94,35.58,215.15A8,8,0,0,1,24,208V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Zm-16,0H40V195.06l20.42-10.22a8,8,0,0,1,7.16,0L96,199.06l28.42-14.22a8,8,0,0,1,7.16,0L160,199.06l28.42-14.22a8,8,0,0,1,7.16,0L216,195.06Z"></path>
            </svg>
            <span className="nav-text">Orders</span>
          </Link>
          <Link to="/cart" className={`nav-item ${activePage.startsWith('/cart') ? 'active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" fill="currentColor" viewBox="0 0 256 256">
              <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"></path>
            </svg>
            <span className="nav-text">Cart</span>
          </Link>
          <Link to="/account" className={`nav-item ${activePage.startsWith('/account') ? 'active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" fill="currentColor" viewBox="0 0 256 256">
              <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
            </svg>
            <span className="nav-text">Account</span>
          </Link>
        </nav>
      </div>
      <div className="sidebar-footer">
        <Link to="/logout" className="nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
          <span className="nav-text">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;