import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./styles.css";

const BrowserPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch("http://localhost:8093/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter === "" || product.category === categoryFilter)
    );
  });

  const handleAddToCart = async () => {
    if (!userId || !token) {
      alert("You must be logged in to add products to cart.");
      navigate("/login");
      return;
    }

    if (quantity < 1 || quantity > selectedProduct.quantity) {
      alert("Invalid quantity selected.");
      return;
    }

    const cartItem = {
      productId: selectedProduct.id,
      sellerId: selectedProduct.sellerId, // required by backend
      quantity,
      price: selectedProduct.price,
    };

    try {
      const response = await fetch(
        `http://localhost:8092/api/users/${userId}/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cartItem),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Backend error:", data);
        throw new Error(data.message || "Failed to add to cart");
      }

      alert("Product added to cart!");
      setSelectedProduct(null);
      navigate("/orders"); 
    } catch (err) {
      console.error(err);
      alert("Error adding product to cart: " + err.message);
    }
  };

  const discountValue = selectedProduct
    ? (selectedProduct.price * (selectedProduct.discount || 0)) / 100
    : 0;

  const totalPrice = selectedProduct
    ? ((selectedProduct.price - discountValue) +
        (selectedProduct.deliveryCharge || 0)) *
      quantity
    : 0;

  return (
    <div className="page-container-browser">
      <Sidebar />
      <main className="main-content">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search for products"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-tags">
          {["", "Fruits", "Mobile", "Books"].map((cat) => (
            <span
              key={cat}
              className={`category-tag ${
                categoryFilter === cat ? "active" : ""
              }`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat === "" ? "All" : cat}
            </span>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => {
                  setSelectedProduct(product);
                  setQuantity(1); // reset quantity
                }}
              >
                <div
                  className="product-image"
                  style={{ backgroundImage: `url(${product.image})` }}
                ></div>
                <p className="product-name">{product.name}</p>
              </div>
            ))
          )}
        </div>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="modal-overlay">
            <div className="modal product-detail-modal">
              <h2>{selectedProduct.name} / Product Offer</h2>
              <p>
                Shop Name: <b>{selectedProduct.shopName}</b>
              </p>
              <p>Available Quantity: {selectedProduct.quantity}</p>

              <div className="quantity-input">
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max={selectedProduct.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <div className="price-details-grid">
                <div className="price-item">
                  <p>Price per Unit</p>
                  <p>{selectedProduct.price.toFixed(2)}</p>
                </div>
                <div className="price-item">
                  <p>Discount</p>
                  <p>{selectedProduct.discount || 0}%</p>
                </div>
                <div className="price-item">
                  <p>Delivery Charges per km</p>
                  <p>{selectedProduct.deliveryCharge || 0}</p>
                </div>
                <div className="price-item">
                  <p>Total Price</p>
                  <p>{totalPrice.toFixed(2)}</p>
                </div>
              </div>

              <div className="modal-buttons">
                <button onClick={handleAddToCart} className="confirm-btn">
                  Add to Cart
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>

              <div
                className="product-offer-image"
                style={{ backgroundImage: `url(${selectedProduct.image})` }}
              ></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowserPage;
