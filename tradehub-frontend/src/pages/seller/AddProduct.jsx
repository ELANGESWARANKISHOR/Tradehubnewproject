import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./styles.css";

const AddProduct = () => {
  const sellerId = localStorage.getItem("sellerId"); 
  const token = localStorage.getItem("token");

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    stock: 0,
    price: 0,
    discount: 0,
    imageUrl: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sellerId || !token) {
      alert("You must be logged in as a seller.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8093/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({ ...product, sellerId: parseInt(sellerId) })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to add product");
      }

      const data = await response.json();
      alert("Product added successfully!");
      console.log("Added Product:", data);

      // Reset form
      setProduct({
        name: "",
        description: "",
        category: "",
        stock: 0,
        price: 0,
        discount: 0,
        imageUrl: ""
      });
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Error adding product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content">
        <h2 className="page-title">Add New Product</h2>
        <form className="update-form" onSubmit={handleSubmit}>
          {Object.keys(product).map((key) => (
            <div className="form-group" key={key}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                type={
                  key === "price" || key === "stock" || key === "discount"
                    ? "number"
                    : "text"
                }
                name={key}
                value={product[key]}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          ))}

          <button type="submit" className="update-button" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddProduct;
