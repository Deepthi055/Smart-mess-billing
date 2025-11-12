import React from "react";
import "./MenuPage.css";

function MenuPage({ onUsageClick, onReportClick }) {
  const foodItems = [
    { id: 1, name: "Idli", price: 30 },
    { id: 2, name: "Vada", price: 25 },
    { id: 3, name: "Rice & Curry", price: 50 },
    { id: 4, name: "Dosa", price: 35 },
    { id: 5, name: "Chapati", price: 40 },
  ];

  const beverages = [
    { id: 6, name: "Tea", price: 15 },
    { id: 7, name: "Coffee", price: 20 },
    { id: 8, name: "Juice", price: 25 },
    { id: 9, name: "Milk", price: 18 },
    { id: 10, name: "Butter Milk", price: 10 },
  ];

  return (
    <div className="menu-container">
      <header className="menu-header">
        <h2>🍽️ Smart Mess Menu</h2>
        <nav>
          <button onClick={onUsageClick}>Student Usage</button>
          <button onClick={onReportClick}>View Report</button>
        </nav>
      </header>

      <main className="menu-content">
        <div className="menu-form">
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            🧾 Today's Menu
          </h3>

          {/* FOOD ITEMS */}
          <h3 style={{ marginTop: "10px", color: "#4d2907" }}>🍛 Food Items</h3>
          <div className="menu-grid">
            {foodItems.map((item) => (
              <div key={item.id} className="menu-card">
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
              </div>
            ))}
          </div>

          {/* BEVERAGES */}
          <h3 style={{ marginTop: "40px", color: "#4d2907" }}>☕ Beverages</h3>
          <div className="menu-grid">
            {beverages.map((item) => (
              <div key={item.id} className="menu-card">
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MenuPage;
