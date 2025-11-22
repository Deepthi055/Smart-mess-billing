import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageAdmin.css';

export default function ViewPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    axios.get('/api/payments').then(r => { if (mounted) setPayments(r.data || []); setLoading(false); }).catch(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-header"><h2>Payments</h2></div>
      <div className="admin-body">
        <div className="admin-panel">
          {loading ? <div className="loader">Loading…</div> : (
            <table className="admin-table">
              <thead><tr><th>Student</th><th>Date</th><th>Amount</th><th>Mode</th></tr></thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id}><td>{p.student_name}</td><td>{p.date}</td><td>{p.amount}</td><td>{p.mode}</td></tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
