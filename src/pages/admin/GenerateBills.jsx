import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../admin/ManageAdmin.css';

export default function GenerateBills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [search, setSearch] = useState('');
  const [preview, setPreview] = useState(null);
  const [generating, setGenerating] = useState(false);

  // Fetch all bills
  const fetchBills = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/bill');
      setBills(res.data || []);
    } catch (err) {
      console.error('Failed to fetch bills', err.message);
      setBills([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  // Generate bills for selected month/year
  const handleGenerate = async () => {
    if (!filterMonth || !filterYear) {
      alert('Please enter both month and year');
      return;
    }

    setGenerating(true);
    try {
      await axios.post('/api/bill/generate-bills', {
        month: Number(filterMonth),
        year: Number(filterYear),
      });
      await fetchBills();
      alert('Bills generated successfully!');
    } catch (err) {
      console.error('Generate failed', err.message);
      alert('Failed to generate bills');
    } finally {
      setGenerating(false);
    }
  };

  // Filter bills
  const filteredBills = bills.filter(b => {
    if (filterMonth && Number(b.month) !== Number(filterMonth)) return false;
    if (filterYear && Number(b.year) !== Number(filterYear)) return false;
    if (search && !(b.student_name || '').toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Preview a bill
  const handlePreview = (bill) => {
    setPreview({ ...bill, items: bill.items || [{ name: 'Meals', qty: 1, rate: bill.total_amount.toFixed(2) }] });
  };

  // Export CSV
  const exportCSV = () => {
    const rows = [['Student', 'Month', 'Year', 'Amount'], ...filteredBills.map(b => [b.student_name, b.month, b.year, b.total_amount])];
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bills.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>Generate & Manage Bills</h2>
      </div>

      <div className="admin-body">
        <div className="admin-panel">
          <div className="toolbar">
            <div className="filters">
              <input
                placeholder="Search student"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <input
                placeholder="Month (1-12)"
                value={filterMonth}
                onChange={e => setFilterMonth(e.target.value)}
                style={{ width: 110 }}
              />
              <input
                placeholder="Year (YYYY)"
                value={filterYear}
                onChange={e => setFilterYear(e.target.value)}
                style={{ width: 120 }}
              />
              <button className="btn" onClick={() => { setFilterMonth(''); setFilterYear(''); setSearch(''); }}>
                Reset
              </button>
            </div>

            <div className="actions">
              <button className="btn primary" onClick={handleGenerate} disabled={generating}>
                {generating ? 'Generating…' : 'Generate Bills'}
              </button>
              <button className="btn" onClick={exportCSV}>Export CSV</button>
            </div>
          </div>

          {loading ? <div className="loader">Loading bills…</div> : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Month</th>
                  <th>Year</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBills.length === 0 ? (
                  <tr><td colSpan={5} className="ms-empty">No bills found</td></tr>
                ) : filteredBills.map(b => (
                  <tr key={b.bill_id}>
                    <td>{b.student_name}</td>
                    <td>{b.month}</td>
                    <td>{b.year}</td>
                    <td>₹{b.total_amount}</td>
                    <td>
                      <button className="btn" onClick={() => handlePreview(b)}>View</button>
                      <button className="btn" onClick={() => alert('Download not implemented')}>Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {preview && (
        <div className="ms-modal" onClick={() => setPreview(null)}>
          <div className="ms-modal-card" onClick={e => e.stopPropagation()}>
            <h3>Bill Preview - {preview.student_name} ({preview.month}/{preview.year})</h3>
            <div style={{ marginBottom: 12 }}>
              <strong>Total:</strong> ₹{preview.total_amount}
            </div>
            <table className="admin-table">
              <thead>
                <tr><th>Item</th><th>Qty</th><th>Rate</th><th>Total</th></tr>
              </thead>
              <tbody>
                {(preview.items || []).map((it, i) => (
                  <tr key={i}>
                    <td>{it.name}</td>
                    <td>{it.qty}</td>
                    <td>₹{it.rate}</td>
                    <td>₹{(it.qty * Number(it.rate)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="ms-modal-actions">
              <button className="btn primary" onClick={() => alert('Print/Download mock')}>Download PDF</button>
              <button className="btn" onClick={() => setPreview(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
