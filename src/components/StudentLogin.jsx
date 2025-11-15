import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function StudentLogin() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/user-dashboard"); // Redirect to user dashboard
  }

  return (
    <div className="login-container">
      <Link to="/" className="home-btn">Home</Link>

      <div className="login-box">
        <h2>Student Login</h2>

        <form onSubmit={handleSubmit}>
          <label>Student ID</label>
          <input type="text" placeholder="Enter Student ID" />

          <label>Password</label>
          <input type="password" placeholder="Enter Password" />

          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}
