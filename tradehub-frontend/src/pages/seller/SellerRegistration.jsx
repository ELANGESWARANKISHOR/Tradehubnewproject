import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './SellerRegistration.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const LocationMarker = ({ setFormData }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setFormData(prev => ({
        ...prev,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      }));
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
};

const SellerRegistration = () => {
  const [formData, setFormData] = useState({
    shopname: '',
    email: '',
    password: '',
    confirmPassword: '',
    latitude: '',
    longitude: '',
    contactNumber: '',
    deliverycharge: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Remove confirmPassword from payload
    const payload = { ...formData };
    delete payload.confirmPassword;

    try {
      const response = await fetch("http://localhost:8095/api/sellers/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Seller registered successfully:", data);
        alert("Registration successful!");
      } else {
        const error = await response.text();
        console.error("Registration failed:", error);
        alert("Registration failed!");
      }
    } catch (err) {
      console.error("Error connecting to backend:", err);
      alert("Error connecting to backend!");
    }
  };

  return (
    <div className="registration-container">
      <header className="header-registration">
        <Link to="/login" className="signup-link">
          Sign In
        </Link>
      </header>

      <main className="main-content-registration">
        <div className="registration-box">
          <h2 className="registration-title">Register Your Shop</h2>
          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="shopname"
                placeholder="Shop Name"
                value={formData.shopname}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Select your shop location:</label>
              <MapContainer
                center={[7.8731, 80.7718]} 
                zoom={7}
                style={{ height: '250px', width: '100%', marginTop: '0.5rem' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <LocationMarker setFormData={setFormData} />
              </MapContainer>
              {formData.latitude && formData.longitude && (
                <p className="location-display">
                  📍 Lat: {formData.latitude.toFixed(5)}, Lng:{' '}
                  {formData.longitude.toFixed(5)}
                </p>
              )}
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="number"
                name="deliverycharge"
                placeholder="Delivery Charge per KM"
                value={formData.deliverycharge}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <button type="submit" className="registration-button">
              Register
            </button>
          </form>

          <div className="login-prompt">
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerRegistration;
