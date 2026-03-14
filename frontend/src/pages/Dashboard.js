import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function Dashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [loans, setLoans] = useState([]);
  const [eligibleLoans, setEligibleLoans] = useState([]);

  useEffect(() => {
    fetchLoans();
    fetchEligibleLoans();
  }, []);

  // Fetch loan history
  const fetchLoans = async () => {
    try {
      const res = await API.get(`/api/loan/history/${user.user.id}`);
      setLoans(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch eligible loans based on CIBIL
  const fetchEligibleLoans = async () => {
    try {

      const res = await API.get(`/api/loan/eligible/${user.user.cibilScore}`);

      setEligibleLoans(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const appliedLoans = loans.length;
  const approvedLoans = loans.filter(l => l.status === "APPROVED").length;
  const rejectedLoans = loans.filter(l => l.status === "REJECTED").length;

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 p-10">

        {/* Welcome Header */}

        <div className="bg-blue-200 p-4 rounded-lg flex justify-between items-center mb-8">

          <h2 className="text-xl font-semibold">
            Welcome, {user.user.name}
          </h2>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-4 gap-6 mb-8">

          <div className="bg-blue-400 text-white p-5 rounded-lg shadow">

            <p>CIBIL Score</p>

            <h2 className="text-2xl font-bold">
              {user.user.cibilScore}
            </h2>

          </div>

          <div className="bg-purple-400 text-white p-5 rounded-lg shadow">

            <p>Applied Loans</p>

            <h2 className="text-2xl font-bold">
              {appliedLoans}
            </h2>

          </div>

          <div className="bg-green-400 text-white p-5 rounded-lg shadow">

            <p>Approved Loans</p>

            <h2 className="text-2xl font-bold">
              {approvedLoans}
            </h2>

          </div>

          <div className="bg-red-400 text-white p-5 rounded-lg shadow">

            <p>Rejected Loans</p>

            <h2 className="text-2xl font-bold">
              {rejectedLoans}
            </h2>

          </div>

        </div>

        {/* Eligible Loans Section */}

        <h2 className="text-2xl font-bold mb-4">
          Available Loans For You
        </h2>

        {eligibleLoans.length === 0 ? (

          <div className="bg-white p-6 rounded shadow text-center">

            <p className="text-red-500 font-semibold">
              Sorry, you are currently not eligible for loans.
            </p>

            <p className="text-gray-500 mt-2">
              Improve your CIBIL score to apply.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-2 gap-6">

            {eligibleLoans.map((loan, index) => (

              <div key={index} className="bg-white p-6 rounded-lg shadow">

                <h3 className="text-lg font-bold mb-2">
                  {loan.loanType}
                </h3>

                <p>Interest Rate: {loan.interest}</p>
                <p>Max Amount: ₹{loan.maxAmount}</p>

                <button
                  onClick={() => navigate("/apply-loan")}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Apply
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default Dashboard;