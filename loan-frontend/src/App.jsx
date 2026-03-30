import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ApplyLoan from "./pages/ApplyLoan";
import LoanHistory from "./pages/LoanHistory";
import LoanResult from "./pages/LoanResult";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <Router>

      <Routes>

        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id" element={<ChangePassword />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Loan */}
        <Route path="/apply-loan" element={<ApplyLoan />} />
        <Route path="/loan-history" element={<LoanHistory />} />
        <Route path="/loan-result" element={<LoanResult />} />

      </Routes>

    </Router>
  );
}

export default App;