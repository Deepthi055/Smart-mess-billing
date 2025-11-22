import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageAdmin.css';

export default function ManageMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', category: 'food', price: '' });

  useEffect(() => {
    let mounted = true;
    axios
      .get('/api/menu')
      .then((r) => {
        if (mounted) setItems(r.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  const handleAdd = async (e) => {
    e?.preventDefault();
    if (!form.name || !form.price) return;
    try {
      const res = await axios.post('/api/menu', { ...form, price: Number(form.price) });
      const created = res?.data || { id: Date.now(), ...form };
      setItems((prev) => [created, ...prev]);
      setForm({ name: '', category: 'food', price: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to add item');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await axios.delete(`/api/menu/${id}`);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>Manage Menu</h2>
      </div>
      <div className="admin-body">
        <div className="admin-panel">
          <form className="form-row" onSubmit={handleAdd}>
            <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option value="food">Food</option>
              <option value="beverage">Beverage</option>
            </select>
            <input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <button type="submit" className="btn primary">Add</button>
          </form>

          {loading ? (
            <div className="loader">Loading…</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id}>
                    <td>{it.name}</td>
                    <td>{it.category}</td>
                    <td>{it.price}</td>
                    <td>
                      <button className="danger" onClick={() => handleDelete(it.id)}>Delete</button>
                    </td>
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
