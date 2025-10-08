import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./styles.css";

const AccountPage = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8094/api/orders?customerId=${userId}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, [userId]);

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content account-page">
        <h2 className="page-title">Order History</h2>

        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <p className="order-date">
                  Ordered on {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <h3 className="order-number">Order #{order.id}</h3>
                <p>Total Items: {order.totalItemsSubtotal}</p>
                <p>Total Delivery: {order.totalDelivery}</p>
                <p>Total Discount: {order.totalDiscount}</p>
                <p>Total Amount: {order.totalAmount}</p>
                <p>Status: {order.status}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AccountPage;
