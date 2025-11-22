import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageAdmin.css';

export default function ManageStaff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    axios
      .get('/api/staff')
      .then((r) => {
        if (mounted) setStaff(r.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>Manage Staff</h2>
      </div>
      <div className="admin-body">
        <div className="admin-panel">
          {loading ? (
            <div className="loader">Loading…</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Staff ID</th>
                  <th>Name</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((s) => (
                  <tr key={s.id ?? s.staff_id}>
                    <td>{s.id ?? s.staff_id}</td>
                    <td>{s.name}</td>
                    <td>{s.role}</td>
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
