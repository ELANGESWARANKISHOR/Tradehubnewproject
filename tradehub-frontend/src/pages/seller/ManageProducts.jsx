import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./styles.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const token = localStorage.getItem("token");
  const sellerId = localStorage.getItem("sellerId"); // store sellerId at login

  const fetchProducts = async () => {
    try {
      const res = await fetch(`http://localhost:8093/api/products/seller/${sellerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching products: " + err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`http://localhost:8093/api/products/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Delete failed");
        alert("Product deleted successfully");
        fetchProducts();
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:8093/api/products/${editProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editProduct),
      });
      if (!res.ok) throw new Error("Update failed");
      alert("Product updated successfully!");
      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content">
        <h2 className="page-title">Manage Your Products</h2>
        <div className="manage-products-table-container">
          <table className="manage-products-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                    <td>{product.price}</td>
                    <td>{product.discount}</td>
                    <td>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => setEditProduct(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {editProduct && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Edit Product</h3>
              {["name","description","category","stock","price","discount"].map((field) => (
                <div key={field}>
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type={field === "stock" || field === "price" || field === "discount" ? "number" : "text"}
                    name={field}
                    value={editProduct[field]}
                    onChange={handleEditChange}
                  />
                </div>
              ))}
              <div className="modal-buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditProduct(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageProducts;
