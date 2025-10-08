import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./styles.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const LocationMarker = ({ setFormData, initialPosition }) => {
  const [position, setPosition] = useState(initialPosition);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setFormData((prev) => ({
        ...prev,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      }));
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
};

const SellerUpdate = () => {
  const [formData, setFormData] = useState({
    shopname: "",
    email: "",
    password: "",
    contactNumber: "",
    deliverycharge: "",
    latitude: "",
    longitude: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8095/api/sellers/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedSeller = await response.json();
        alert("Profile updated successfully!");
        console.log("Updated Seller:", updatedSeller);
      } else {
        const error = await response.text();
        console.error("Update failed:", error);
        alert("Update failed!");
      }
    } catch (err) {
      console.error("Error connecting to backend:", err);
      alert("Error connecting to backend!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content">
        <h2 className="page-title">Update Shop Details</h2>
        <form className="update-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Shop Name</label>
            <input
              type="text"
              name="shopname"
              value={formData.shopname}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Leave blank to keep existing password"
            />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Delivery Charge per KM</label>
            <input
              type="number"
              name="deliverycharge"
              value={formData.deliverycharge}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Select Shop Location:</label>
            <MapContainer
              center={[7.8731, 80.7718]}
              zoom={7}
              style={{ height: "250px", width: "100%", marginTop: "0.5rem" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <LocationMarker setFormData={setFormData} initialPosition={null} />
            </MapContainer>
            {formData.latitude && formData.longitude && (
              <p className="location-display">
                📍 Lat: {formData.latitude.toFixed(5)}, Lng: {formData.longitude.toFixed(5)}
              </p>
            )}
          </div>

          <button type="submit" className="update-button" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default SellerUpdate;
