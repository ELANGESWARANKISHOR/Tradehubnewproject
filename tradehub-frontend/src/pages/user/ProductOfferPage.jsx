import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./styles.css";

const ProductOfferPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  
  useEffect(() => {
    if (!userId || !token) {
      alert("You must be logged in to view your cart.");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch(`http://localhost:8092/api/users/${userId}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch cart");

        const data = await res.json();
        setCartItems(data);

        
        const productResponses = await Promise.all(
          data.map((item) =>
            fetch(`http://localhost:8093/api/products/${item.productId}`)
              .then((res) => res.json())
              .catch(() => null)
          )
        );

        const productMap = {};
        productResponses.forEach((prod, i) => {
          if (prod) productMap[data[i].productId] = prod;
        });

        setProductDetails(productMap);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId, token]);

  
  const handleRemove = async (productId) => {
    try {
      const res = await fetch(
        `http://localhost:8092/api/users/${userId}/cart/${productId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to remove item");

      setCartItems(cartItems.filter((item) => item.productId !== productId));
      alert("Item removed from cart.");
    } catch (err) {
      console.error(err);
      alert("Error removing item: " + err.message);
    }
  };

  
  const handleConfirmOrder = async (item) => {
    const product = productDetails[item.productId];
    if (!product) {
      alert("Product details not found.");
      return;
    }

    const orderItem = {
      sellerId: product.sellerId,
      productId: product.id,
      productName: product.name,
      quantity: item.quantity,
      price: product.price,
      discount: product.discount || 0,
      total:
        (product.price - (product.price * (product.discount || 0)) / 100) *
        item.quantity,
    };

    const orderRequest = [orderItem]; 

    try {
      const res = await fetch(
        `http://localhost:8094/api/orders?customerId=${userId}&customerLat=0&customerLon=0`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderRequest),
        }
      );

      if (!res.ok) throw new Error("Failed to confirm order");

      alert(`Order placed for ${product.name}!`);
      handleRemove(item.productId); 
    } catch (err) {
      console.error(err);
      alert("Error confirming order: " + err.message);
    }
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content cart-page">
        <h2 className="cart-title">🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-grid">
            {cartItems.map((item) => {
              const product = productDetails[item.productId];
              if (!product) return null;

              const discountValue = (product.price * (product.discount || 0)) / 100;
              const totalPrice =
                ((product.price - discountValue) +
                  (product.deliveryCharge || 0)) *
                item.quantity;

              return (
                <div key={item.productId} className="cart-item-card">
                  <div
                    className="cart-item-image"
                    style={{ backgroundImage: `url(${product.image})` }}
                  ></div>

                  <div className="cart-item-details">
                    <h3>{product.name}</h3>
                    <p>Shop: <b>{product.shopName}</b></p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price per Unit: Rs. {product.price}</p>
                    <p>Discount: {product.discount || 0}%</p>
                    <p>Delivery Charge: Rs. {product.deliveryCharge || 0}</p>
                    <h4>Total: Rs. {totalPrice.toFixed(2)}</h4>

                    <div className="cart-buttons">
                      <button
                        className="confirm-btn"
                        onClick={() => handleConfirmOrder(item)}
                      >
                        Confirm Order
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(item.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductOfferPage;


