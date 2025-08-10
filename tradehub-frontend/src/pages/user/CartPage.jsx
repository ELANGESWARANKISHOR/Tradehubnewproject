import React from 'react';
import Sidebar from './Sidebar';
import './styles.css';

const CartPage = () => {
  const shop1 = {
    name: "Eco Essentials",
    products: [
      { id: 1, name: "Eco-Friendly Water Bottle", price: 150.00, quantity: 200, discount: "5%", total: 30000 }
    ],
    subtotal: 30000,
    delivery: 1000,
    totalDiscount: 1500
  };

  const shop2 = {
    name: "Sustainable Living",
    products: [
      { id: 2, name: "Reusable Shopping Bag", price: 10.00, quantity: 100, discount: "10%", total: 1000 }
    ],
    subtotal: 1000,
    delivery: 100,
    totalDiscount: 100
  };

  const orderSummary = {
    totalItemsSubtotal: 31000,
    totalDelivery: 1100,
    totalDiscount: 1600,
    tax: 300,
    total: 30800
  };

  const renderShopCart = (shop) => (
    <div className="shop-cart-section" key={shop.name}>
      <h3 className="shop-name-title">Shop: {shop.name}</h3>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Discount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {shop.products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price.toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>{product.discount}</td>
              <td>{product.total.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="shop-summary">
        <p>Subtotal: <span>{shop.subtotal.toLocaleString()}</span></p>
        <p>Delivery: <span>{shop.delivery.toLocaleString()}</span></p>
        <p>Total Discount: <span>{shop.totalDiscount.toLocaleString()}</span></p>
      </div>
      <div className="cart-actions">
        <button className="btn reject-btn">Reject Order</button>
        <button className="btn confirm-btn">Confirm Order</button>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content cart-page">
        <h2 className="page-title">My Cart</h2>
        {renderShopCart(shop1)}
        {renderShopCart(shop2)}
        
        <div className="order-summary-section">
          <h3 className="section-title">Order Summary</h3>
          <p>Total Items Subtotal: <span>{orderSummary.totalItemsSubtotal.toLocaleString()}</span></p>
          <p>Total Delivery: <span>{orderSummary.totalDelivery.toLocaleString()}</span></p>
          <p>Total Discount: <span>{orderSummary.totalDiscount.toLocaleString()}</span></p>
          <p>Tax: <span>{orderSummary.tax.toLocaleString()}</span></p>
          <p>Total: <span>{orderSummary.total.toLocaleString()}</span></p>
        </div>
      </main>
    </div>
  );
};

export default CartPage;