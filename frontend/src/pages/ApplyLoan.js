import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function ApplyLoan() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [loan, setLoan] = useState({
    loanType: "",
    loanAmount: "",
    income: "",
    creditScore: "",
    panNumber: "",
    existingLoan: "",
    yearsOfEmployment: ""
  });

  const handleChange = (e) => {
    setLoan({ ...loan, [e.target.name]: e.target.value });
  };

  const applyLoan = async () => {

    if (
      !loan.loanType ||
      !loan.loanAmount ||
      !loan.income ||
      !loan.creditScore ||
      !loan.panNumber ||
      !loan.yearsOfEmployment
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      const res = await API.post("/api/loan/apply", {
        ...loan,
        userId: user.user.id
      });

      navigate("/loan-result", { state: res.data });

    } catch (error) {

      alert("Loan Application Failed");

    }

  };

  return (

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex items-center justify-center">

        <div className="bg-white w-[450px] p-8 rounded-xl shadow-lg">

          <h1 className="text-2xl font-bold text-center mb-6">
            Apply Loan
          </h1>

          {/* Loan Type */}

          <select
            name="loanType"
            value={loan.loanType}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
          >
            <option value="">Select Loan Type</option>
            <option value="Personal Loan">Personal Loan</option>
            <option value="Home Loan">Home Loan</option>
            <option value="Car Loan">Car Loan</option>
            <option value="Education Loan">Education Loan</option>
          </select>

          {/* PAN Number */}

          <input
            type="text"
            name="panNumber"
            placeholder="Enter PAN Number (ABCDE1234F)"
            value={loan.panNumber}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
          />

          {/* Loan Amount */}

          <input
            type="number"
            name="loanAmount"
            placeholder="Loan Amount"
            value={loan.loanAmount}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
          />

          {/* Monthly Income */}

          <input
            type="number"
            name="income"
            placeholder="Monthly Income"
            value={loan.income}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
          />

          {/* Existing Loan */}

          <input
            type="number"
            name="existingLoan"
            placeholder="Existing Loan Amount (if any)"
            value={loan.existingLoan}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
          />

          {/* Credit Score */}

          <input
            type="number"
            name="creditScore"
            placeholder="Credit Score (300-900)"
            value={loan.creditScore}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
          />

          {/* Years of Employment */}

          <input
            type="number"
            name="yearsOfEmployment"
            placeholder="Years of Employment"
            value={loan.yearsOfEmployment}
            onChange={handleChange}
            className="w-full border p-3 mb-6 rounded"
          />

          {/* Apply Button */}

          <button
            onClick={applyLoan}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Apply Loan
          </button>

        </div>

      </div>

    </div>

  );

}

export default ApplyLoan;