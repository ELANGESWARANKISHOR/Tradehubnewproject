import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './styles.css';

const CartPage = () => {
  const [orders, setOrders] = useState([]);
  const [sellerDeliveryRates, setSellerDeliveryRates] = useState({}); // example: { sellerId: rate }

  useEffect(() => {
    // Fetch all confirmed orders for the logged-in user
    fetch('http://localhost:8093/api/orders?status=CONFIRMED') // Replace with your backend endpoint
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Error fetching confirmed orders:', err));

    // Fetch seller delivery rates (optional)
    fetch('http://localhost:8094/api/sellers/deliveryRates')
      .then(res => res.json())
      .then(data => setSellerDeliveryRates(data))
      .catch(err => console.error('Error fetching delivery rates:', err));
  }, []);

  const calculateDelivery = (sellerId, distance) => {
    const rate = sellerDeliveryRates[sellerId] || 0;
    return rate * distance;
  };

  const renderOrder = (order) => {
    const distance = 10; // example km; can be dynamic from user's location
    const totalDelivery = order.items.reduce((sum, item) => sum + calculateDelivery(item.sellerId, distance), 0);
    const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalDiscount = order.items.reduce((sum, item) => sum + (item.discount || 0), 0);
    const total = subtotal + totalDelivery - totalDiscount;

    return (
      <div className="shop-cart-section" key={order.id}>
        <h3 className="shop-name-title">Order ID: {order.id}</h3>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map(item => (
              <tr key={item.id}>
                <td>{item.productName}</td>
                <td>
                  <img src={item.productImage} alt={item.productName} width={50} />
                </td>
                <td>{item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>{item.discount || 0}</td>
                <td>{(item.price * item.quantity - (item.discount || 0)).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="shop-summary">
          <p>Subtotal: <span>{subtotal.toLocaleString()}</span></p>
          <p>Delivery: <span>{totalDelivery.toLocaleString()}</span></p>
          <p>Total Discount: <span>{totalDiscount.toLocaleString()}</span></p>
          <p>Total: <span>{total.toLocaleString()}</span></p>
        </div>
      </div>
    );
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content cart-page">
        <h2 className="page-title">My Confirmed Orders</h2>
        {orders.length === 0 ? <p>You have no confirmed orders.</p> : orders.map(renderOrder)}
      </main>
    </div>
  );
};

export default CartPage;
