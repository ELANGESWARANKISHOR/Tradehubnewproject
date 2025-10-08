import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./styles.css";

const SellerOrders = () => {
  const sellerId = localStorage.getItem("sellerId"); // Logged-in seller ID
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders for this seller
  const fetchOrders = async () => {
    if (!sellerId || !token) {
      alert("You must be logged in as a seller.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8094/api/orders/seller/${sellerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      alert("Error fetching orders: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Confirm order
  const handleConfirm = async (orderId) => {
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:8094/api/orders/${orderId}/confirm`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to confirm order");
      }

      alert("Order confirmed!");
      fetchOrders(); // Refresh orders
    } catch (err) {
      console.error("Error confirming order:", err);
      alert("Error confirming order: " + err.message);
    }
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content">
        <h2 className="page-title">My Orders</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <h3>Order #{order.id}</h3>
                <p>
                  Customer ID: <b>{order.customerId}</b>
                </p>
                <p>Status: <b>{order.status}</b></p>
                <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>

                <div className="order-items">
                  <h4>Items:</h4>
                  {order.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <p>
                        {item.productName} - Qty: {item.quantity} - Price:{" "}
                        {item.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {order.status !== "CONFIRMED" && (
                  <button
                    className="update-button"
                    onClick={() => handleConfirm(order.id)}
                  >
                    Confirm Order
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SellerOrders;
