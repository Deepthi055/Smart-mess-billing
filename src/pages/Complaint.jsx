import { useState } from "react";

export default function Complaint() {
  const [complaint, setComplaint] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!complaint.trim()) {
      alert("Please enter a complaint");
      return;
    }
    alert("Complaint submitted successfully!");
    setComplaint("");
  };

  return (
    <div className="complaint-container">
      <h2>Submit a Complaint</h2>

      <form onSubmit={handleSubmit} className="complaint-form">
        <textarea
          placeholder="Enter your complaint here..."
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
