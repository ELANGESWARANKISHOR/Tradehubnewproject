import React from 'react';
import Sidebar from './Sidebar';
import './styles.css';

const AddProduct = () => {
  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content">
        <h2 className="page-title">Add Product</h2>
        <div className="add-product-form">
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input type="text" id="productName" placeholder="Enter Product Name" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" placeholder="Description"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input type="text" id="category" placeholder="Category" />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="quantity" placeholder="Enter quantity" />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" placeholder="Enter price" />
          </div>
          <div className="form-group">
            <label htmlFor="discount">Discount</label>
            <input type="number" id="discount" placeholder="Enter discount" />
          </div>
          <button className="add-product-btn">Add Product</button>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;