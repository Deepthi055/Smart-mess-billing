import { Outlet, Link } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><Link to="manage-menu">Manage Menu</Link></li>
          <li><Link to="manage-students">Manage Students</Link></li>
          <li><Link to="orders">Student Orders</Link></li>
          <li><Link to="billing">Billing</Link></li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-content">
        <Outlet />
      </main>

    </div>
  );
}
