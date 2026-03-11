import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ApplyLoan from "./pages/ApplyLoan";
import LoanHistory from "./pages/LoanHistory";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";

function App(){

return(

<Router>

<Routes>

<Route path="/" element={<Login/>} />

<Route path="/register" element={<Register/>} />

<Route path="/dashboard" element={<Dashboard/>} />

<Route path="/apply-loan" element={<ApplyLoan/>} />

<Route path="/loan-history" element={<LoanHistory/>} />

<Route path="/forgot-password" element={<ForgotPassword/>} />

<Route path="/change-password" element={<ChangePassword/>} />

</Routes>

</Router>

)

}

export default App;