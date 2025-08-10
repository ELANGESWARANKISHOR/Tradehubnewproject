import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import './styles.css';

const HomePage = () => {
  const trendingProducts = [
    { 
      id: '1', 
      name: 'Organic Apples', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg' 
    },
    { 
      id: '2', 
      name: 'Bestseller Novel', 
      image: 'https://images-na.ssl-images-amazon.com/images/I/81bsw6fnUiL.jpg' 
    },
    { 
      id: '3', 
      name: 'Fresh Coffee', 
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80://cdn.pixabay.com/photo/2016/11/29/10/07/milk-1868656_1280.jpg' 
    },
  ];

  return (
  <div className='page-container'>
    <Sidebar />
    <main className="main-content">
      <h2 className="section-title">Trending Products</h2>
      <div className="trending-products">
        {trendingProducts.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}></div>
            <p className="product-name">{product.name}</p>
          </Link>
        ))}
      </div>

      <h2 className="section-title">Current Offers</h2>
      <div className="current-offers-grid">
        <div className="offer-card">
          <div className="offer-image" style={{ backgroundImage: 'url("https://cdn.pixabay.com/photo/2017/01/31/22/25/sale-2028249_1280.jpg")' }}></div>
          <div className="offer-details">
            <p className="offer-title">Summer Sale</p>
            <p className="offer-description">Up to 50% off</p>
          </div>
        </div>
        <div className="offer-card">
          <div className="offer-image" style={{ backgroundImage: 'url("http://googleusercontent.com/file_content/1")' }}></div>
          <div className="offer-details">
            <p className="offer-title">Back to School Deals</p>
            <p className="offer-description">Discounts on school supplies and more</p>
          </div>
        </div>
        <div className="offer-card">
          <div className="offer-image" style={{ backgroundImage: 'url("http://googleusercontent.com/file_content/0")' }}></div>
          <div className="offer-details">
            <p className="offer-title">Clearance Event</p>
            <p className="offer-description">Last chance to grab these items</p>
          </div>
        </div>
      </div>
    </main>
  </div>
  );
};

export default HomePage;