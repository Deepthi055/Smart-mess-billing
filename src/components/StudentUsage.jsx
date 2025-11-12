import React, { useState } from "react";
import "./StudentUsage.css"; // optional if you want to style externally

function StudentUsage() {
  const [studentId, setStudentId] = useState("");
  const [mealType, setMealType] = useState("");
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  const foodItems = [
    { id: 1, name: "Idli", price: 30 },
    { id: 2, name: "Chapati", price: 25 },
    { id: 3, name: "Rice & Curry", price: 50 },
    { id: 4, name: "Dosa", price: 35 },
  ];

  const beverages = [
    { id: 1, name: "Tea", price: 10 },
    { id: 2, name: "Coffee", price: 15 },
    { id: 3, name: "Juice", price: 25 },
  ];

  const handleSelect = (item) => {
    setItems([...items, item]);
  };

  const handleSubmit = async () => {
    if (!studentId || !mealType) {
      setMessage("⚠️ Please enter all details!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/usage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, mealType, items }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`✅ ${data.message}`);
        setStudentId("");
        setMealType("");
        setItems([]);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Database connection error");
    }
  };

  const totalCost = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="usage-container">
      <h2 className="usage-title">🍛 Record Student Mess Usage</h2>

      <div className="usage-form">
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="input-field"
        />

        <select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className="select-field"
        >
          <option value="">Select Meal Type</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
      </div>

      <div className="menu-section">
        <h3>🍱 Food Items</h3>
        <div className="item-grid">
          {foodItems.map((item) => (
            <div key={item.id} className="item-card" onClick={() => handleSelect(item)}>
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
              <button className="add-btn">Add</button>
            </div>
          ))}
        </div>

        <h3>☕ Beverages</h3>
        <div className="item-grid">
          {beverages.map((item) => (
            <div key={item.id} className="item-card" onClick={() => handleSelect(item)}>
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
              <button className="add-btn">Add</button>
            </div>
          ))}
        </div>
      </div>

      <div className="selected-section">
        <h3>🧾 Selected Items</h3>
        {items.length === 0 ? (
          <p>No items selected yet.</p>
        ) : (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item.name} — ₹{item.price}
              </li>
            ))}
          </ul>
        )}
        <p className="total">Total: ₹{totalCost}</p>

        <button onClick={handleSubmit} className="submit-btn">
          ✅ Confirm Order
        </button>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default StudentUsage;
