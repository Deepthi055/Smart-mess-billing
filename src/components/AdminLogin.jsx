import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // TEMPORARY LOGIN — later replace with MySQL check
    navigate("/admin-dashboard");
  };

  return (
    <div className="login-container">
      <Link to="/" className="home-btn">Home</Link>

      <div className="login-box">
        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>
          <label>Staff ID</label>
          <input type="text" placeholder="Enter Staff ID" />

          <label>Password</label>
          <input type="password" placeholder="Enter Password" />

          <button className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}
