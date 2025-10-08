import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./styles.css";

const SellerDashboard = () => {
  const sellerId = localStorage.getItem("sellerId");
  const token = localStorage.getItem("token");

  const [recentOrders, setRecentOrders] = useState([]);
  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    avgRating: 0, 
    recentOrdersCount: 0,
  });
  const [shopInfo, setShopInfo] = useState({ name: "", description: "", imageUrl: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const shopRes = await fetch(`http://localhost:8095/api/sellers/${sellerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const shopData = await shopRes.json();
        setShopInfo(shopData);

        
        const productsRes = await fetch(`http://localhost:8093/api/products?sellerId=${sellerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const productsData = await productsRes.json();
        setMetrics(prev => ({ ...prev, totalProducts: productsData.length }));

        
        const ordersRes = await fetch(`http://localhost:8094/api/orders/seller/${sellerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ordersData = await ordersRes.json();
        setRecentOrders(ordersData);
        setMetrics(prev => ({ ...prev, recentOrdersCount: ordersData.length }));
      } catch (err) {
        console.error("Error fetching seller dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sellerId, token]);

  if (loading) return <div className="loading">Loading seller dashboard...</div>;

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content">
        <h2 className="page-title">Seller Dashboard</h2>

        <div className="seller-dashboard-header">
          <div className="shop-info">
            <h3>Shop: {shopInfo.name || "N/A"}</h3>
            <p>{shopInfo.description || "No description available"}</p>
          </div>
          {shopInfo.imageUrl && (
            <div
              className="shop-image"
              style={{ backgroundImage: `url(${shopInfo.imageUrl})` }}
            ></div>
          )}
        </div>

        <div className="seller-metrics-grid">
          <div className="metric-card">
            <span className="metric-value">{metrics.totalProducts}</span>
            <span className="metric-label">Total Products</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">{metrics.avgRating.toFixed(1)}</span>
            <span className="metric-label">Avg. Customer Rating</span>
          </div>
          <div className="metric-card">
            <span className="metric-value">{metrics.recentOrdersCount}</span>
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
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    No orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerName || "N/A"}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-tag status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.totalAmount.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;

