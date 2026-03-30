import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function LoanResult() {

  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No Data Found</p>
      </div>
    );
  }

  // ✅ SINGLE CLEAN AI EXPLANATION
  const generateExplanation = () => {

    const emi = Number(data.emi) || 0;
    const income = Number(data.income) || 0;
    const allowedEmi = income * 0.4;

    const creditScore = Number(data.creditScore) || 0;
    const existingLoan = Number(data.existingLoan) || 0;
    const employment = Number(data.yearsOfEmployment) || 0;

    let explanation = [];

    // EMI
    if (emi > allowedEmi) {
      explanation.push(
        `Your EMI (₹${emi.toFixed(0)}) exceeds allowed ₹${allowedEmi.toFixed(0)}`
      );
    }

    // Income
    if (income < 20000) {
      explanation.push("Your income is low, increasing risk.");
    } else {
      explanation.push("Your income is stable.");
    }

    // Credit score
    if (creditScore >= 700) {
      explanation.push("You have a strong credit score.");
    } else {
      explanation.push("Your credit score is low.");
    }

    // Existing loan
    if (existingLoan > 50000) {
      explanation.push("You already have high loan obligations.");
    }

    // Employment
    if (employment < 2) {
      explanation.push("Your employment history is short.");
    } else {
      explanation.push("Your employment is stable.");
    }

    // fallback
    if (explanation.length === 0) {
      explanation.push("Loan evaluated using multiple financial factors.");
    }

    return explanation;
  };

  return (

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex items-center justify-center">

        <div className="bg-white p-8 rounded-2xl shadow-xl w-[500px]">

          <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
            Loan Result
          </h1>

          {/* STATUS */}
          <div className={`p-4 rounded-lg text-white text-center mb-4 
            ${data.status === "APPROVED" ? "bg-green-500" : "bg-red-500"}`}>
            <h2 className="text-xl font-semibold">{data.status}</h2>
          </div>

          {/* REASON */}
          <h3 className="font-semibold text-lg mb-1">Reason</h3>
          <p className="mb-4 text-gray-700">{data.reason}</p>

          {/* RISK SCORE */}
          <h3 className="font-semibold text-lg mb-1">Risk Score</h3>
          <p className="mb-4 text-blue-600 font-bold text-xl">
            {data.riskScore?.toFixed(2)}
          </p>

          {/* EMI */}
          <h3 className="font-semibold text-lg mb-1">EMI Details</h3>

          <div className="bg-gray-100 p-4 rounded mb-4 text-sm">

            <p><strong>EMI:</strong> ₹{data.emi?.toFixed(2)}</p>

            {data.income && (
              <p>
                <strong>Allowed EMI:</strong> ₹{(data.income * 0.4).toFixed(2)}
              </p>
            )}

          </div>

          {/* WARNING */}
          {data.status === "REJECTED" && data.reason?.includes("EMI") && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              ⚠️ EMI too high — reduce loan amount or increase tenure
            </div>
          )}

          {/* ✅ SINGLE AI ANALYSIS */}
          <h3 className="font-semibold text-lg mb-1">AI Analysis</h3>

          <div className="bg-gray-100 p-4 rounded text-sm text-gray-700">

            {generateExplanation().map((point, index) => (
              <p key={index}>• {point}</p>
            ))}

          </div>

          {/* BUTTON */}
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg"
          >
            Back to Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}

export default LoanResult;