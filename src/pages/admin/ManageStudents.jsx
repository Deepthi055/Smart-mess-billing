import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageStudents.css";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({
    student_id: null,
    name: "",
    roll_no: "",
    room_no: "",
    password: "", // include password for Add
  });

  // Fetch students from backend
  const fetchStudents = async () => {
    try {
      const res = await axios.get("/api/students"); // adjust if needed
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const openAdd = () => {
    setForm({ student_id: null, name: "", roll_no: "", room_no: "", password: "" });
    setShowAdd(true);
  };

  const openEdit = (s) => {
    setForm({ ...s, password: "" }); // password not editable here
    setShowEdit(true);
  };

  // Add student
  const handleAdd = async () => {
    if (!form.name || !form.roll_no || !form.password)
      return alert("Name, Roll No, and Password are required");

    try {
      await axios.post("/api/students", form);
      fetchStudents(); // refresh list
      setShowAdd(false);
    } catch (err) {
      console.error("Error adding student:", err);
      alert("Failed to add student");
    }
  };

  // Update student
  const handleUpdate = async () => {
    if (!form.name || !form.roll_no) return alert("Name and Roll No are required");

    try {
      await axios.put(`/api/students/${form.student_id}`, {
        name: form.name,
        roll_no: form.roll_no,
        room_no: form.room_no,
      });
      fetchStudents(); // refresh list
      setShowEdit(false);
    } catch (err) {
      console.error("Error updating student:", err);
      alert("Failed to update student");
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await axios.delete(`/api/students/${id}`);
      setStudents(students.filter((s) => s.student_id !== id));
    } catch (err) {
      console.error("Error deleting student:", err);
      alert("Failed to delete student");
    }
  };

  return (
    <div className="ms-container">
      <div className="ms-header">
        <h2>Manage Students</h2>
        <button className="ms-btn primary" onClick={openAdd}>
          + Add Student
        </button>
      </div>

      <div className="ms-card">
        <table className="ms-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Room No</th>
              <th style={{ width: 180 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="4" className="ms-empty">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s.student_id}>
                  <td>{s.name}</td>
                  <td>{s.roll_no}</td>
                  <td>{s.room_no}</td>
                  <td>
                    <button className="ms-btn edit" onClick={() => openEdit(s)}>
                      Edit
                    </button>
                    <button
                      className="ms-btn delete"
                      onClick={() => handleDelete(s.student_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ADD MODAL */}
      {showAdd && (
        <div className="ms-modal">
          <div className="ms-modal-card">
            <h3>Add Student</h3>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="Roll No"
              value={form.roll_no}
              onChange={(e) => setForm({ ...form, roll_no: e.target.value })}
            />
            <input
              placeholder="Room No"
              value={form.room_no}
              onChange={(e) => setForm({ ...form, room_no: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <div className="ms-modal-actions">
              <button className="ms-btn primary" onClick={handleAdd}>
                Save
              </button>
              <button className="ms-btn cancel" onClick={() => setShowAdd(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEdit && (
        <div className="ms-modal">
          <div className="ms-modal-card">
            <h3>Edit Student</h3>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="Roll No"
              value={form.roll_no}
              onChange={(e) => setForm({ ...form, roll_no: e.target.value })}
            />
            <input
              placeholder="Room No"
              value={form.room_no}
              onChange={(e) => setForm({ ...form, room_no: e.target.value })}
            />
            <div className="ms-modal-actions">
              <button className="ms-btn primary" onClick={handleUpdate}>
                Update
              </button>
              <button className="ms-btn cancel" onClick={() => setShowEdit(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
