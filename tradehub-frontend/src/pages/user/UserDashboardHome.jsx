import React from 'react';
import './Userdashboard.css';

/**
 * Component for the Home page of the user dashboard.
 * Displays sections for trending products and current offers.
 */
const UserDashboardHome = () => {
  // Sample data for trending products
  const trendingProducts = [
    { name: 'Organic Apples', image: 'https://placehold.co/200x150/dcfce7/15803d?text=Apples' },
    { name: 'Bestseller Novel', image: 'https://placehold.co/200x150/fef3c7/854d0e?text=Novel' },
    { name: 'Fresh Milk', image: 'https://placehold.co/200x150/e0e7ff/3730a3?text=Milk' },
    { name: 'Bulk Cleaning Supplies', image: 'https://placehold.co/200x150/ffedd5/9a3412?text=Supplies' },
  ];

  // Sample data for current offers
  const currentOffers = [
    { name: 'Summer Sale', description: 'Up to 50% off', image: 'https://placehold.co/250x150/ffe4e6/be185d?text=Summer+Sale' },
    { name: 'Back to School Deals', description: 'Discounts on school supplies and more', image: 'https://placehold.co/250x150/cffafe/0f766e?text=Back+to+School' },
    { name: 'Clearance Event', description: 'Last chance to grab these items', image: 'https://placehold.co/250x150/e5e7eb/374151?text=Clearance' },
  ];

  return (
    <div className="page-content">
      <h2 className="page-title">Trending Products</h2>
      <div className="product-grid">
        {trendingProducts.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <p className="product-name">{product.name}</p>
          </div>
        ))}
      </div>

      <h2 className="page-title mt-8">Current Offers</h2>
      <div className="offer-grid">
        {currentOffers.map((offer, index) => (
          <div key={index} className="offer-card">
            <img src={offer.image} alt={offer.name} className="offer-image" />
            <div className="offer-details">
              <p className="offer-name">{offer.name}</p>
              <p className="offer-description">{offer.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboardHome;
