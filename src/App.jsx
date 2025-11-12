import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import MenuPage from "./components/MenuPage";
import StudentUsage from "./components/StudentUsage";
import UsageReport from "./components/UsageReport";

function App() {
  const [page, setPage] = useState("landing");

  // Force full screen size
  const appStyle = {
    width: "100vw",
    height: "100vh",
    overflowX: "hidden",
  };

  return (
    <div style={appStyle}>
      {page === "landing" ? (
        <LandingPage onStart={() => setPage("menu")} />
      ) : page === "menu" ? (
        <MenuPage
          onUsageClick={() => setPage("usage")}
          onReportClick={() => setPage("report")}
        />
      ) : page === "usage" ? (
        <StudentUsage />
      ) : (
        <UsageReport />
      )}

      {/* Navigation buttons */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {page !== "landing" && (
          <button
            onClick={() => setPage("landing")}
            style={{
              margin: "5px",
              padding: "8px 12px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ⬅️ Home
          </button>
        )}

        {page === "usage" && (
          <button
            onClick={() => setPage("report")}
            style={{
              margin: "5px",
              padding: "8px 12px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            📊 View Report
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
