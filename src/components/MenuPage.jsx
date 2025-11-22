import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MenuPage.css";

function MenuPage({ onUsageClick, onReportClick }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get("http://localhost:5000/api/menu")
      .then((res) => {
        if (!mounted) return;
        // Support two possible response shapes: { food: [], beverages: [] } or flat array
        if (res.data) {
          if (Array.isArray(res.data)) {
            setItems(res.data);
          } else if (res.data.food || res.data.beverages) {
            const food = Array.isArray(res.data.food) ? res.data.food : [];
            const bev = Array.isArray(res.data.beverages) ? res.data.beverages : [];
            // normalize category field if missing
            const normalized = [
              ...food.map((f) => ({ ...f, category: f.category || "food" })),
              ...bev.map((b) => ({ ...b, category: b.category || "beverage" })),
            ];
            setItems(normalized);
          } else {
            // fallback: try to extract values
            setItems(Object.values(res.data).flat() || []);
          }
        }
      })
      .catch((err) => console.error("Error loading menu:", err))
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  const filtered = items
    .filter((it) => (category === "all" ? true : it.category === category))
    .filter((it) => it.name && it.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="menu-container">
      <header className="menu-header">
        <div className="menu-title">
          <h2>🍽️ Smart Mess Menu</h2>
          <p className="subtitle">Freshly prepared, affordable meals</p>
        </div>

        <nav className="menu-actions">
          <input
            className="menu-search"
            placeholder="Search dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={onUsageClick}>Student Usage</button>
          <button onClick={onReportClick}>View Report</button>
        </nav>
      </header>

      <main className="menu-content">
        <div className="menu-form">
          <div className="menu-top">
            <h3>🧾 Today's Menu</h3>
            <div className="tabs">
              <button className={category === "all" ? "active" : ""} onClick={() => setCategory("all")}>
                All
              </button>
              <button className={category === "food" ? "active" : ""} onClick={() => setCategory("food")}>
                Food
              </button>
              <button
                className={category === "beverage" ? "active" : ""}
                onClick={() => setCategory("beverage")}
              >
                Beverages
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loader">Loading menu...</div>
          ) : filtered.length === 0 ? (
            <div className="empty">No items found.</div>
          ) : (
            <div className="menu-grid">
              {filtered.map((item) => (
                <div key={item.id || item.name} className="menu-card">
                  <div className="media">
                    <div className="img-placeholder">{item.name ? item.name.charAt(0) : "?"}</div>
                  </div>
                  <div className="content">
                    <h4>{item.name}</h4>
                    <p className="desc">{item.description || "Delicious and freshly prepared."}</p>
                    <div className="meta">
                      <span className="price">₹{item.price ?? "--"}</span>
                      <button className="add-btn">Add</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MenuPage;
