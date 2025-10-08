import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkle } from "lucide-react";
import "./LoginPage.css";

const LoginPage = () => {
  const [role, setRole] = useState("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleChange = (e) => setRole(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url =
        role === "buyer"
          ? "http://localhost:8092/api/users/login"
          : "http://localhost:8095/api/sellers/login";

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();
      console.log("Login successful:", data);

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save userId for buyer (needed for cart)
      if (role === "buyer") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId); // make sure backend sends userId
        navigate("/user-dashboard");
      } else {
        // Seller login: decode token to get sellerId
        const base64Payload = data.token.split('.')[1];
        const payload = JSON.parse(atob(base64Payload));
        if (payload.sellerId) localStorage.setItem("sellerId", payload.sellerId);
        navigate("/seller-dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
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
            <label className={`role-label ${role === "buyer" ? "selected" : ""}`}>
              Buyer
              <input type="radio" name="role" value="buyer" checked={role === "buyer"} onChange={handleRoleChange} />
            </label>
            <label className={`role-label ${role === "seller" ? "selected" : ""}`}>
              Seller
              <input type="radio" name="role" value="seller" checked={role === "seller"} onChange={handleRoleChange} />
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
