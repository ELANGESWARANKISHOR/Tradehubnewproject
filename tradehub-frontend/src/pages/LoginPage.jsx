import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Sparkle } from 'lucide-react';
import "./LoginPage.css";

const LoginPage = () => {
  const [role, setRole] = useState("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ role, email, password });
  };

  return (
    <div className="login-container">
      
      <header className="header-login">
        <div className="header-logo">
          <Link to="/" className="flex items-center gap-2 text-current">
            <Sparkle className="text-blue-600" size={28} />
            <span className="logo-text">Trade Hub</span>
          </Link>
        </div>
      </header>

      
      <main className="main-content-login">
        <div className="login-box">
          <h2 className="login-title">Log in to Trade Hub</h2>

          
          <div className="role-selection">
            <label
              className={`role-label ${role === "buyer" ? "selected" : ""}`}
              htmlFor="buyer"
            >
              Buyer
              <input
                type="radio"
                id="buyer"
                name="role"
                value="buyer"
                checked={role === "buyer"}
                onChange={handleRoleChange}
              />
            </label>
            <label
              className={`role-label ${role === "seller" ? "selected" : ""}`}
              htmlFor="seller"
            >
              Seller
              <input
                type="radio"
                id="seller"
                name="role"
                value="seller"
                checked={role === "seller"}
                onChange={handleRoleChange}
              />
            </label>
          </div>

          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-input"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>

            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;