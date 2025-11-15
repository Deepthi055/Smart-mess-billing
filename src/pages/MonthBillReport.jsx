import { useState } from "react";

function MonthBillReport() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h2>Monthly Bill Report</h2>

      <div style={{ marginTop: "25px", display: "flex", gap: "20px" }}>
        <div>
          <label>Select Month:</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <div>
          <label>Enter Year:</label>
          <input
            type="number"
            placeholder="2025"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
      </div>

      <button style={{ marginTop: "20px" }}>
        Get Monthly Bill
      </button>

      <div style={{ marginTop: "35px" }}>
        <h3>Result (Will show after backend added)</h3>
      </div>
    </div>
  );
}

export default MonthBillReport;
