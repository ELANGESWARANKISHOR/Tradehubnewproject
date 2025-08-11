import React from 'react';
import Sidebar from './Sidebar';
import './styles.css';
import milk from '../../assets/Milk.jpg';
import Novel from '../../assets/Novel.jpg';



const AccountPage = () => {
  const orderHistory = [
    {
      id: '123456',
      deliveredOn: 'June, 20, 2025',
      image: milk,
      volume: '40L',
      total: 4900
    },
    {
      id: '789012',
      deliveredOn: 'July, 2, 2025',
      image: Novel,
      volume: '5 item',
      total: 7500
    }
  ];

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content account-page">
        <h2 className="page-title">Order History</h2>
        <div className="order-controls">
          <select className="sort-by-select">
            <option>Sort by Date</option>
          </select>
          <select className="filter-by-select">
            <option>Filter by Product</option>
          </select>
        </div>

        <div className="orders-grid">
          {orderHistory.map(order => (
            <div key={order.id} className="order-card">
              <p className="order-delivered-date">Delivered on {order.deliveredOn}</p>
              <h3 className="order-number">Order #{order.id}</h3>
              <div className="order-item-image" style={{ backgroundImage: `url(${order.image})` }}></div>
              <p className="order-item-volume">{order.volume}</p>
              <p className="order-item-total">Total: {order.total}</p>
              <button className="view-details-btn">View Details</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AccountPage;