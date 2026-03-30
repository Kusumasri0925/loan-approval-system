import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

import { Home, CreditCard, Car, GraduationCap, Briefcase } from "lucide-react";

function Dashboard() {

  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [loans, setLoans] = useState([]);
  const [eligibleLoans, setEligibleLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLoanIcon = (type) => {
    switch (type) {
      case "Home Loan": return <Home size={48} strokeWidth={1.5} />;
      case "Personal Loan": return <CreditCard size={48} strokeWidth={1.5} />;
      case "Car Loan": return <Car size={48} strokeWidth={1.5} />;
      case "Education Loan": return <GraduationCap size={48} strokeWidth={1.5} />;
      case "Business Loan": return <Briefcase size={48} strokeWidth={1.5} />;
      default: return <CreditCard size={48} strokeWidth={1.5} />;
    }
  };

  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
      return;
    }

    fetchLoans();
    fetchEligibleLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await API.get(`/api/loan/history/${storedUser?.user?.id}`);
      setLoans(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEligibleLoans = async () => {
    try {
      const cibilScore = storedUser?.user?.cibilScore;
      const income = storedUser?.user?.income;

      const res = await API.get(
        `/api/loan/eligible?cibilScore=${cibilScore}&income=${income}`
      );

      setEligibleLoans(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const appliedLoans = loans.length;
  const approvedLoans = loans.filter(l => l.status?.toUpperCase() === "APPROVED").length;
  const rejectedLoans = loans.filter(l => l.status?.toUpperCase() === "REJECTED").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading dashboard...</p>
      </div>
    );
  }

  return (

    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">

      <Sidebar />

      <div className="flex-1 p-10">

        {/* HEADER */}
        <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow flex justify-between items-center mb-10">

          <h2 className="text-xl font-semibold text-gray-800">
            Welcome, {storedUser?.user?.name}
          </h2>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Logout
          </button>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 mb-10">

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <p className="opacity-80">CIBIL Score</p>
            <h2 className="text-3xl font-bold">{storedUser?.user?.cibilScore}</h2>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <p className="opacity-80">Applied</p>
            <h2 className="text-3xl font-bold">{appliedLoans}</h2>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <p className="opacity-80">Approved</p>
            <h2 className="text-3xl font-bold">{approvedLoans}</h2>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <p className="opacity-80">Rejected</p>
            <h2 className="text-3xl font-bold">{rejectedLoans}</h2>
          </div>

        </div>

        {/* LOANS */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Available Loans
        </h2>

        <div className="grid grid-cols-3 gap-8">

          {eligibleLoans.map((loan, index) => (

            <div
              key={index}
              className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center"
            >

              {/* ICON */}
              <div className="flex justify-center mb-4 text-blue-600">
                {getLoanIcon(loan.loanType)}
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {loan.loanType.toUpperCase()}
              </h3>

              {/* DETAILS */}
              <p className="text-sm text-gray-600">
                Interest: {loan.interest}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Max: ₹{loan.maxAmount}
              </p>

              {/* BUTTON */}
              <button
                onClick={() => navigate("/apply-loan", { state: loan })}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Apply
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default Dashboard;