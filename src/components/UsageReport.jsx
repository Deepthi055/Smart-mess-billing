import React, { useEffect, useState } from "react";
import axios from "axios";

function UsageReport() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/usage")
      .then((res) => setRecords(res.data))
      .catch((err) => console.error("❌ Fetch error:", err));
  }, []);

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        backgroundColor: "#f8f9fd",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          padding: "30px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#14056dff",
            marginBottom: "20px",
            fontSize: "28px",
          }}
        >
          📊 Student Mess Usage Report
        </h2>

        {records.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555" }}>No records found</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#14056dff", color: "white" }}>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Student ID</th>
                  <th style={thStyle}>Meal Type</th>
                  <th style={thStyle}>Items</th>
                  <th style={thStyle}>Total Cost (₹)</th>
                  <th style={thStyle}>Date</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, index) => {
                  let parsedItems = [];
                  try {
                    parsedItems = JSON.parse(r.items);
                  } catch (e) {
                    parsedItems = [];
                  }

                  const itemNames = parsedItems.map((i) => i.name).join(", ");

                  return (
                    <tr
                      key={r.id}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#f4f6ff" : "white",
                        transition: "all 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#e7e9ff")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          index % 2 === 0 ? "#f4f6ff" : "white")
                      }
                    >
                      <td style={tdStyle}>{r.id}</td>
                      <td style={tdStyle}>{r.student_id}</td>
                      <td style={tdStyle}>{r.mealType}</td>
                      <td style={tdStyle}>{itemNames}</td>
                      <td style={tdStyle}>₹{r.totalCost}</td>
                      <td style={tdStyle}>
                        {new Date(r.usageDate).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ✅ Common cell styles
const thStyle = {
  padding: "12px 10px",
  fontWeight: "600",
  borderBottom: "2px solid #ddd",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
  color: "#333",
};

export default UsageReport;
