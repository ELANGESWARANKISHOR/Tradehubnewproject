import React from 'react';
import Sidebar from './Sidebar';
import './styles.css';

const SellerDashboard = () => {
  const recentOrders = [
    { id: '#12345', customer: 'John', date: '2025-03-15', status: 'Pending', total: 15000 },
    { id: '#12346', customer: 'Perera', date: '2025-03-14', status: 'Delivered', total: 20000 },
    { id: '#12347', customer: 'Smith', date: '2025-03-13', status: 'Pending', total: 7500 },
    { id: '#12348', customer: 'Silva', date: '2025-03-12', status: 'Shipped', total: 30000 },
    { id: '#12349', customer: 'Josh', date: '2025-03-11', status: 'Delivered', total: 10000 },
  ];

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content">
        <h2 className="page-title">Home</h2>
        <div className="seller-dashboard-header">
          <div className="shop-info">
            <h3>Shop: Tech Haven</h3>
            <p>Your one-stop shop for all things tech. We offer a wide range of electronics, gadgets, and accessories to meet your needs.</p>
          </div>
          <div className="shop-image" style={{ backgroundImage: 'url("http://googleusercontent.com/file_content/2")' }}></div>
        </div>
        
        <div className="seller-metrics-grid">
          <div className="metric-card">
            <span className="metric-value">125</span>
            <span className="metric-label">Total Products</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">4.7</span>
            <span className="metric-label">Avg. Customer Rating</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">32</span>
            <span className="metric-label">Recent Orders</span>
          </div>
        </div>

        <h2 className="section-title">Recent Orders</h2>
        <div className="recent-orders-table-container">
          <table className="recent-orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td><span className={`status-tag status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                  <td>{order.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;