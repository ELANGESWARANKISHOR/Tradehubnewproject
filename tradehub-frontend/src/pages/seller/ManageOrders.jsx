import React from 'react';
import Sidebar from './Sidebar';
import './styles.css';

const ManageOrders = () => {
  const orders = [
    { id: '#12345', customer: 'John', items: '2 Items', total: 50.00, status: 'Pending' },
    { id: '#12346', customer: 'Perera', items: '1 Item', total: 25.00, status: 'Pending' },
    { id: '#12347', customer: 'Silva', items: '3 Items', total: 75.00, status: 'Pending' },
    { id: '#12348', customer: 'Smith', items: '2 Items', total: 50.00, status: 'Pending' },
  ];

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content">
        <h2 className="page-title">Manage Orders</h2>
        <div className="manage-orders-table-container">
          <table className="manage-orders-table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.items}</td>
                  <td>{order.total.toFixed(2)}</td>
                  <td><span className={`status-tag status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                  <td>
                    <button className="action-btn confirm-btn">Confirm Order</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ManageOrders;