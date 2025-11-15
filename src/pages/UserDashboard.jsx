import { Link, Outlet } from "react-router-dom";
import "./UserDashboard.css";

export default function UserDashboard() {
  return (
    <div className="dashboard-container">

      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li><Link to="complaint">Complaint</Link></li>
          <li><Link to="payment">Payment</Link></li>
          <li><Link to="bill-report">Bill Report</Link></li>
        </ul>
      </div>

      <div className="content-area">
        <Outlet />
      </div>

    </div>
  );
}
