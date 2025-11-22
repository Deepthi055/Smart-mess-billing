import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageAdmin.css';

export default function UsageRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Fetch usage records from backend
    axios.get('http://localhost:5000/api/usage') // make sure this route exists
      .then(res => {
        if (mounted) setRecords(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    return () => (mounted = false);
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>Usage Records</h2>
      </div>
      <div className="admin-body">
        <div className="admin-panel">
          {loading ? (
            <div className="loader">Loading…</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Student</th>
                  <th>Meal</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {records.map(r => (
                  <tr key={r.id}>
                    <td>{r.date}</td>
                    <td>{r.student_name}</td>
                    <td>{r.meal}</td>
                    <td>{r.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
