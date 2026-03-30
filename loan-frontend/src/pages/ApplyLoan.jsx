import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function ApplyLoan() {

  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const selectedLoan = location.state;

  const [loan, setLoan] = useState({
    loanType: selectedLoan?.loanType || "",
    loanAmount: "",
    income: user?.user?.income || "",
    creditScore: user?.user?.cibilScore || "",
    panNumber: "",
    existingLoan: "",
    yearsOfEmployment: ""
  });

  const [eligibleLoans, setEligibleLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const isValidPAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);

  useEffect(() => {
    fetchEligibleLoans();
  }, []);

  // ✅ FIX: Only calculate when required inputs are filled
  useEffect(() => {

    if (
      loan.loanAmount &&
      loan.income &&
      loan.creditScore &&
      loan.yearsOfEmployment !== ""
    ) {
      calculatePreview();
    } else {
      setPreview(null);
    }

  }, [loan]);

  const fetchEligibleLoans = async () => {
    try {
      const res = await API.get(
        `/api/loan/eligible?cibilScore=${user.user.cibilScore}&income=${user.user.income}`
      );
      setEligibleLoans(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setLoan({ ...loan, [e.target.name]: e.target.value });
  };

  // ✅ VALIDATION
  const validate = () => {

    if (!loan.loanType) return alert("Select loan type");

    if (!loan.panNumber || !isValidPAN(loan.panNumber))
      return alert("Invalid PAN");

    if (!loan.loanAmount || loan.loanAmount <= 0)
      return alert("Enter valid loan amount");

    if (!loan.yearsOfEmployment)
      return alert("Enter employment years");

    return true;
  };

  // ✅ ✅ CORRECT PREVIEW (MATCHES BACKEND)
  const calculatePreview = () => {

    const income = Number(loan.income);
    const existingLoan = Number(loan.existingLoan) || 0;
    const creditScore = Number(loan.creditScore);
    const employment = Number(loan.yearsOfEmployment);
    const loanAmount = Number(loan.loanAmount);

    // 🔥 EMI calculation SAME as backend
    const r = 0.01;
    const n = 60;

    const emi =
      (loanAmount * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    const emiRatio = emi / income;

    // ✅ EMI RULE FIRST
    if (emiRatio > 0.4) {
      return setPreview({
        status: "REJECTED",
        color: "red"
      });
    }

    // ✅ SCORE
    const score =
      (creditScore * 0.4) +
      ((income / 10000) * 0.3) -
      ((existingLoan / 10000) * 0.2) +
      (employment * 0.1);

    setPreview({
      status: score >= 250 ? "APPROVED" : "REJECTED",
      color: score >= 250 ? "green" : "red"
    });
  };

  // ✅ EMI display
  const calculateEMI = () => {
    const P = Number(loan.loanAmount);
    const r = 0.01;
    const n = 60;

    if (!P) return null;

    const emi =
      (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    return emi.toFixed(0);
  };

  const applyLoan = async () => {

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await API.post("/api/loan/apply", {
        ...loan,
        userId: user.user.id
      });

      navigate("/loan-result", { state: res.data });

    } catch (error) {
      alert("Loan Application Failed");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex items-center justify-center">

        <div className="bg-white w-[500px] p-8 rounded-2xl shadow-xl">

          <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
            Apply for Loan
          </h1>

          <label className="text-sm font-semibold">Loan Type</label>
          <select
            name="loanType"
            value={loan.loanType}
            onChange={handleChange}
            className="w-full border p-3 mb-2 rounded"
          >
            <option value="">Select Loan</option>
            {eligibleLoans.map((l, index) => (
              <option key={index} value={l.loanType}>
                {l.loanType} ({l.interest})
              </option>
            ))}
          </select>

          <label className="text-sm font-semibold">PAN Number</label>
          <input
            type="text"
            name="panNumber"
            placeholder="ABCDE1234F"
            value={loan.panNumber}
            onChange={(e) =>
              setLoan({
                ...loan,
                panNumber: e.target.value.toUpperCase()
              })
            }
            className="w-full border p-3 mb-2 rounded"
          />

          <label className="text-sm font-semibold">Loan Amount</label>
          <input
            type="number"
            name="loanAmount"
            value={loan.loanAmount}
            onChange={handleChange}
            className="w-full border p-3 mb-2 rounded"
          />

          {loan.loanAmount && (
            <p className="text-blue-600 text-sm mb-3">
              EMI: ₹{calculateEMI()}
            </p>
          )}

          <label className="text-sm font-semibold">Monthly Income</label>
          <input
            type="number"
            name="income"
            value={loan.income}
            readOnly
            className="w-full border p-3 mb-3 rounded bg-gray-100"
          />

          <input
            type="number"
            name="existingLoan"
            placeholder="Existing Loan"
            value={loan.existingLoan}
            onChange={handleChange}
            className="w-full border p-3 mb-3 rounded"
          />

          <input
            type="number"
            name="yearsOfEmployment"
            placeholder="Years of Employment"
            value={loan.yearsOfEmployment}
            onChange={handleChange}
            className="w-full border p-3 mb-3 rounded"
          />

          <input
            type="number"
            name="creditScore"
            value={loan.creditScore}
            readOnly
            className="w-full border p-3 mb-3 rounded bg-gray-100"
          />

          {preview && (
            <div className={`p-4 rounded-lg mb-4 text-white 
              ${preview.color === "green" ? "bg-green-500" : "bg-red-500"}`}>
              <p className="text-center font-semibold">
                Predicted: {preview.status}
              </p>
            </div>
          )}

          <button
            onClick={applyLoan}
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-xl"
          >
            {loading ? "Processing..." : "Apply Loan"}
          </button>

        </div>

      </div>

    </div>

  );

}

export default ApplyLoan;