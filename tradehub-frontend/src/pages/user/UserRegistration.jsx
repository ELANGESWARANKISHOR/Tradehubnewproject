import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './UserRegistration.css';


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

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    latitude: '',
    longitude: '',
    district: '',
    contactNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  try {
    const response = await fetch('http://localhost:8092/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      alert('Registration successful!');
      console.log(data);
    } else {
      const errorData = await response.json();
      alert('Registration failed: ' + errorData.message);
      console.error(errorData);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong');
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
          <h2 className="registration-title">Create your account</h2>
          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
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

            {/* Map Picker */}
            <div className="form-group">
              <label>Select your location:</label>
              <MapContainer
                center={[7.8731, 80.7718]} // Default to Sri Lanka center
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
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
                className="form-input"
                required
              />
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

export default UserRegistration;
