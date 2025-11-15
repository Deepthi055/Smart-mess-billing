import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import MenuPage from "./components/MenuPage";
import StudentLogin from "./components/StudentLogin";
import AdminLogin from "./components/AdminLogin";

import UserDashboard from "./pages/UserDashboard";
import Complaint from "./pages/Complaint";
import Payment from "./pages/Payment";
import MonthBillReport from "./pages/MonthBillReport";

import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC PAGES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/menu" element={<MenuPage />} />

        {/* USER DASHBOARD */}
        <Route path="/user-dashboard" element={<UserDashboard />}>
          <Route path="complaint" element={<Complaint />} />
          <Route path="payment" element={<Payment />} />
          <Route path="bill-report" element={<MonthBillReport />} />
        </Route>

        {/* ADMIN DASHBOARD */}
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route path="manage-menu" element={<h2>Manage Menu Page</h2>} />
          <Route path="take-order" element={<h2>Take Order Page</h2>} />
          <Route path="generate-bill" element={<h2>Generate Bill Page</h2>} />
        </Route>

      </Routes>
    </Router>
  );
}
