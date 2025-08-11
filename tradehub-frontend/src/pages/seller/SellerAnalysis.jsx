import React from 'react';
import Sidebar from './Sidebar';
import './styles.css';

const SellerAnalysis = () => {
  const topProducts = [
    { product: 'Eco-Friendly Water Bottle', sales: 500, revenue: 5000 },
    { product: 'Organic Cotton T-Shirt', sales: 300, revenue: 3000 },
    { product: 'Reusable Shopping Bag', sales: 200, revenue: 2000 },
  ];

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content">
        <h2 className="page-title">Monthly Analysis</h2>
        <p className="analysis-subtitle">See a quick overview of your performance this month</p>
        
        <div className="analysis-section">
          <h3 className="analysis-section-title">Sales Overview</h3>
          <div className="sales-overview-card">
            <div className="total-sales">
              <span className="total-sales-value">25,000</span>
              <span className="total-sales-label">Total Sales</span>
              <span className="sales-change-indicator up">+10%</span>
            </div>
            <div className="sales-graph">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bar_chart_of_Facebook_shares_sold_in_Q4_2012.svg/1200px-Bar_chart_of_Facebook_shares_sold_in_Q4_2012.svg.png" alt="Sales Graph" />
            </div>
          </div>
        </div>

        <div className="analysis-section">
          <h3 className="analysis-section-title">Top Products</h3>
          <table className="analysis-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Sales</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((item, index) => (
                <tr key={index}>
                  <td>{item.product}</td>
                  <td>{item.sales}</td>
                  <td>{item.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="analysis-section">
          <h3 className="analysis-section-title">Customer Engagement</h3>
          <div className="engagement-metrics-grid">
            <div className="metric-card">
              <span className="metric-value">150</span>
              <span className="metric-label">New Customers</span>
              <span className="sales-change-indicator up">+5%</span>
            </div>
            <div className="metric-card">
              <span className="metric-value">100</span>
              <span className="metric-label">Returning Customers</span>
              <span className="sales-change-indicator up">+1%</span>
            </div>
            <div className="metric-card">
              <span className="metric-value">5000</span>
              <span className="metric-label">Average Order Value</span>
              <span className="sales-change-indicator up">+2%</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerAnalysis;