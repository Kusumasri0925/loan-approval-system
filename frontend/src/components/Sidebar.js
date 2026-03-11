import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (

    <div className="w-60 h-screen bg-blue-600 text-white p-6">

      <h2 className="text-2xl font-bold mb-10">
        Loan System
      </h2>

      <ul className="space-y-4">

        <li
          className="cursor-pointer hover:text-gray-200"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </li>

        <li
          className="cursor-pointer hover:text-gray-200"
          onClick={() => navigate("/apply-loan")}
        >
          Apply Loan
        </li>

        <li
          className="cursor-pointer hover:text-gray-200"
          onClick={() => navigate("/loan-history")}
        >
          Loan History
        </li>

        <li
          className="cursor-pointer hover:text-gray-200"
          onClick={logout}
        >
          Logout
        </li>

      </ul>

    </div>

  );

}

export default Sidebar;