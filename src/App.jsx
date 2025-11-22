import React from "react";
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
import ManageStudents from "./pages/admin/ManageStudents";
import ManageMenu from "./pages/admin/ManageMenu";
import ManageStaff from "./pages/admin/ManageStaff";
import UsageRecords from "./pages/admin/UsageRecords";
import ViewPayments from "./pages/admin/ViewPayments";
import GenerateBills from "./pages/admin/GenerateBills";

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
          <Route index element={<h2 style={{ padding: 20 }}>Welcome to Your Dashboard</h2>} />
          <Route path="complaint" element={<Complaint />} />
          <Route path="payment" element={<Payment />} />
          <Route path="bill-report" element={<MonthBillReport />} />
        </Route>

        {/* ADMIN DASHBOARD */}
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route index element={<h2 style={{ padding: 20 }}>Welcome to Admin Panel</h2>} />
          <Route path="manage-students" element={<ManageStudents />} />
          <Route path="manage-menu" element={<ManageMenu />} />
          <Route path="manage-staff" element={<ManageStaff />} />
          <Route path="usage-records" element={<UsageRecords />} />
          <Route path="payments" element={<ViewPayments />} />
          <Route path="generate-bills" element={<GenerateBills />} />
          <Route path="orders" element={<h2 style={{ padding: 20 }}>Student Orders Page</h2>} />
          <Route path="billing" element={<h2 style={{ padding: 20 }}>Billing Page</h2>} />
        </Route>
      </Routes>
    </Router>
  );
}
