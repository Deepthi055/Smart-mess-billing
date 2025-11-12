import React from "react";
import "./LandingPage.css";

function LandingPage({ onStart }) {
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
            <button onClick={onStart}>Get Started</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Smart Mess Billing System | Designed by Harshitha and Deepthi💙</p>
      </footer>
    </div>
  );
}

export default LandingPage;
