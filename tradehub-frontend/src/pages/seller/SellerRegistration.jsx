import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkle } from 'lucide-react';
import './SellerRegistration.css';


const SellerRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    district: '',
    contactNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Seller registration data submitted:', formData);
    alert("Registration successful!");
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
                name="shopname"
                placeholder="Shopname"
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
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="form-input"
                required
              />
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
            <div className="form-group">
              <input
                type="number"
                name="cdeliverycharge"
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