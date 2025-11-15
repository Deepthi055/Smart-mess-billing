import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      <h1 className="title">Welcome to Smart Mess Billing</h1>

      <div className="button-group">
        <Link to="/student-login">
          <button className="main-btn">User (Student)</button>
        </Link>

        <Link to="/admin-login">
          <button className="main-btn">Admin (Staff)</button>
        </Link>
      </div>
    </div>
  );
}
