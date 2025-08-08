import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkle,
  LayoutDashboard,
  ShoppingBag,
  Heart,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Package,
} from 'lucide-react';
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();

  // Placeholder data for the dashboard widgets
  const [userProfile, setUserProfile] = useState({
    name: 'abc',
    email: 'abc123@gmail.com',
    avatarUrl: 'https://placehold.co/100x100/A3E635/1F2937?text=B',
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: 'ORD-001', item: 'Organic Apples', status: 'Shipped', date: '2024-07-28' },
    { id: 'ORD-002', item: 'Fresh Milk', status: 'Processing', date: '2024-07-27' },
    { id: 'ORD-003', item: 'Notebook', status: 'Delivered', date: '2024-07-25' },
  ]);

  const [favorites, setFavorites] = useState([
    { id: 'FAV-001', name: 'Coffee Beans', supplier: 'BeanCo' },
    { id: 'FAV-002', name: 'Leather Wallets', supplier: 'Craftsmen Guild' },
  ]);

  const handleLogout = () => {
    // In a real application, you would handle authentication state here
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <Sparkle size={32} className="sidebar-logo" />
          <h2 className="logo-text">Trade Hub</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/user-dashboard" className="nav-item active">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/user-dashboard/orders" className="nav-item">
            <ShoppingBag size={20} />
            <span>My Orders</span>
          </Link>
          <Link to="/user-dashboard/favorites" className="nav-item">
            <Heart size={20} />
            <span>Favorites</span>
          </Link>
          <Link to="/user-dashboard/profile" className="nav-item">
            <User size={20} />
            <span>Profile</span>
          </Link>
          <Link to="/user-dashboard/settings" className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
          <button onClick={handleLogout} className="nav-item logout">
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="main-header">
          <h1 className="header-title">Welcome, {userProfile.name}!</h1>
          <div className="user-info">
            <img src={userProfile.avatarUrl} alt="User Avatar" className="user-avatar" />
          </div>
        </header>

        {/* Dashboard Widgets */}
        <div className="widgets-grid">
          {/* Recent Orders Card */}
          <div className="widget-card orders-card">
            <div className="widget-header">
              <h3 className="widget-title">Recent Orders</h3>
              <Link to="/user-dashboard/orders" className="view-all-link">
                View all <ChevronRight size={16} />
              </Link>
            </div>
            <ul className="orders-list">
              {recentOrders.map((order) => (
                <li key={order.id} className="order-item">
                  <Package size={20} className="icon-gray" />
                  <div className="order-details">
                    <span className="order-id">{order.id}</span>
                    <span className="order-product">{order.item}</span>
                    <span className={`order-status status-${order.status.toLowerCase()}`}>{order.status}</span>
                  </div>
                  <span className="order-date">{order.date}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Favorites Card */}
          <div className="widget-card favorites-card">
            <div className="widget-header">
              <h3 className="widget-title">Your Favorites</h3>
              <Link to="/user-dashboard/favorites" className="view-all-link">
                View all <ChevronRight size={16} />
              </Link>
            </div>
            <ul className="favorites-list">
              {favorites.map((fav) => (
                <li key={fav.id} className="favorite-item">
                  <Heart size={20} className="icon-red" />
                  <div className="favorite-details">
                    <span className="favorite-name">{fav.name}</span>
                    <span className="favorite-supplier">by {fav.supplier}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;