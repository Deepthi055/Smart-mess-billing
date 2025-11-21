
import React, { useEffect } from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

function LandingPage() {

  useEffect(() => {
    document.body.classList.add("fullwidth");

    const root = document.getElementById("root");
    const prev = root
      ? {
          maxWidth: root.style.maxWidth,
          padding: root.style.padding,
          margin: root.style.margin,
        }
      : null;

    if (root) {
      root.style.maxWidth = "100%";
      root.style.padding = "0";
      root.style.margin = "0";
    }

    return () => {
      document.body.classList.remove("fullwidth");
      if (root && prev) {
        root.style.maxWidth = prev.maxWidth || "";
        root.style.padding = prev.padding || "";
        root.style.margin = prev.margin || "";
      }
    };
  }, []);

  return (
    <div className="landing-container">
      <header className="header">
        <h1>🍽️ Smart Mess Billing System</h1>
        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <div className="overlay">
          <div className="hero-content">
            <h2>Welcome to the Future of Campus Dining</h2>
            <p>
              Track, manage, and enjoy your meals effortlessly with our smart
              billing system designed for students.
            </p>

            {/* ⭐ Uses Link so routing works exactly like old code */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "1.5rem",
                justifyContent: "center",
              }}
            >
              <Link to="/student-login">
                <button className="btn-primary">User Login</button>
              </Link>

              <Link to="/admin-login">
                <button className="btn-outline">Admin Login</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>
          © 2025 Smart Mess Billing System | Designed by Harshitha and Deepthi 💙
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;
