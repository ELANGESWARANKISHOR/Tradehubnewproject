import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import './styles.css';
import milk from '../../assets/milk.jpg';

const ProductOfferPage = () => {
  const { productId } = useParams();
  const productData = {
    id: productId,
    name: 'Milk',
    shopName: 'Farm Fresh Produce',
    quantity: '100 units',
    pricePerUnit: '$5.00',
    discount: '10%',
    deliveryCharge: '$0.50 per km',
    totalPrice: '$4.50',
    image: milk
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content product-offer-page">
        <div className="product-header">
          <div className="product-info-left">
            <h2 className="product-name-title">{productData.name} / Product Offer</h2>
            <h1 className="product-offer-title">Product Offer Details</h1>
            <p className="shop-name">Shop Name: <span className="shop-name-value">{productData.shopName}</span></p>
            <p className="available-quantity">Available Quantity: <span className="quantity-value">{productData.quantity}</span></p>
            <button className="add-to-cart-btn">Add to Cart</button>
            
            <div className="price-details-grid">
              <div className="price-item">
                <p className="price-label">Price per Unit</p>
                <p className="price-value">{productData.pricePerUnit}</p>
              </div>
              <div className="price-item">
                <p className="price-label">Discount</p>
                <p className="price-value">{productData.discount}</p>
              </div>
              <div className="price-item">
                <p className="price-label">Delivery Charges per km</p>
                <p className="price-value">{productData.deliveryCharge}</p>
              </div>
              <div className="price-item">
                <p className="price-label">Total Price</p>
                <p className="price-value">{productData.totalPrice}</p>
              </div>
            </div>
          </div>
          <div className="product-image-container">
            <div className="product-offer-image" style={{ backgroundImage: `url(${productData.image})` }}></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductOfferPage;