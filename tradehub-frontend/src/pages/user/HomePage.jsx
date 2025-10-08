import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import './styles.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8093/api/products') 
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content">
        <h2 className="section-title">All Products</h2>
        <div className="products-grid">
          {products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            products.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="product-card">
                <div
                  className="product-image"
                  style={{ backgroundImage: `url(${product.image})` }}
                ></div>
                <p className="product-name">{product.name}</p>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
