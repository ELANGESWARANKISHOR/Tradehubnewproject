import React from 'react';
import Sidebar from './Sidebar';
import './styles.css';

const ManageProducts = () => {
    const products = [
      { name: 'Eco-Friendly Bamboo Toothbrush', price: 199, stock: 150, category: 'Personal Care', status: 'Active' },
      { name: 'Organic Cotton T-Shirt', price: 1990, stock: 200, category: 'Apparel', status: 'Active' },
      { name: 'Recycled Paper Notebooks', price: 120, stock: 100, category: 'Stationery', status: 'Active' },
      { name: 'Sustainable Water Bottle', price: 40, stock: 120, category: 'Accessories', status: 'Inactive' },
      { name: 'Reusable Shopping Bags', price: 5, stock: 180, category: 'Accessories', status: 'Inactive' },
 ];

 return (
  <div className="page-container">
      <Sidebar />
      <main className="main-content">
        <h2 className="page-title">Manage Products</h2>
        <div className="manage-products-table-container">
          <table className="manage-products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <td><span className={`status-tag status-${product.status.toLowerCase()}`}>{product.status}</span></td>
                  <td>
                    <button className="action-btn edit-btn">Edit</button>
                    <button className="action-btn delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ManageProducts;