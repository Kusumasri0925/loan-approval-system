import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Authentication */}
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Reset Password (IMPORTANT FIX) */}
        <Route path="/reset-password/:id" element={<ChangePassword />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Loan Pages */}
        <Route path="/apply-loan" element={<ApplyLoan />} />
        <Route path="/loan-history" element={<LoanHistory />} />
        <Route path="/loan-result" element={<LoanResult />} />

      </Routes>

    </Router>

  );

}

export default App;