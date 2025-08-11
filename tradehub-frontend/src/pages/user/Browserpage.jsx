import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import './styles.css';
import milk from '../../assets/milk.jpg';
import Organicapple from '../../assets/Organic apple.jpg';
import Painrelief from '../../assets/PainRelief.jpg';
import Novel from '../../assets/Novel.jpg';
import Handwash from '../../assets/Handwash.jpg';
import flu from '../../assets/flu.jpg';
import Textbook from '../../assets/Textbook.jpg';

const BrowserPage = () => {
  const products = [
    { id: '1', name: 'Organic Apples', image: Organicapple },
    { id: '2', name: 'Pain Relief Tablets', image: Painrelief },
    { id: '3', name: 'Bestseller Novel', image: Novel },
    { id: '4', name: 'Hand Wash', image: Handwash },
    { id: '5', name: 'Fresh Milk', image: milk},
    { id: '6', name: 'Cold Remedy Capsules', image: flu },
    { id: '7', name: 'Educational Textbook', image: Textbook },
    { id: '8', name: 'Office Paper Reams', image: 'http://googleusercontent.com/file_content/1' },
  ];

  return (
    <div className="page-container-browser">
      <Sidebar />
      <main className="main-content">
        <div className="search-bar-container">
          <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search for products" className="search-input" />
        </div>
        <div className="category-tags">
          <span className="category-tag">Grocery</span>
          <span className="category-tag">Medicine</span>
          <span className="category-tag">Books</span>
          <span className="category-tag">Other Wholesale</span>
        </div>

        <div className="products-grid">
          {products.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="product-card">
              <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}></div>
              <p className="product-name">{product.name}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BrowserPage;