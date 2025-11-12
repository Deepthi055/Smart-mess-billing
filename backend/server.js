const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Harshitha@123", // 👈 your MySQL password here
  database: "MessManagement"
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    return;
  }
  console.log("✅ MySQL connected successfully!");
});

app.get("/", (req, res) => {
  res.send("Smart Mess Billing Backend is running 🚀");
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));

// Get all usage records
app.get("/api/usage", (req, res) => {
  const query = "SELECT * FROM studentusage ORDER BY usageDate DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Database fetch error:", err);
      return res.status(500).json({ error: "Database fetch failed" });
    }
    res.json(results);
  });
});


// POST API to record student meal usage
app.post("/api/usage", (req, res) => {
  const { studentId, mealType, items } = req.body;
  const totalCost = items.reduce((sum, item) => sum + item.price, 0);

  console.log("📩 Received request from frontend:", req.body);

  const sql = "INSERT INTO studentusage (student_id, mealType, items, totalCost) VALUES (?, ?, ?, ?)";
  
  db.query(sql, [studentId, mealType, JSON.stringify(items), totalCost], (err, result) => {
    if (err) {
      console.error("❌ Database error:", err.message);
      res.status(500).json({ error: err.message });
    } else {
      console.log("✅ Record inserted successfully!");
      res.json({ message: "Usage recorded successfully!" });
    }
  });
});



