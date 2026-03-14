import React, { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function LoanHistory() {

  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchLoans = async () => {

      try {

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
          alert("User not logged in");
          return;
        }

        const userId = storedUser.user?.id || storedUser.id;

        const res = await API.get(`/api/loan/history/${userId}`);

        setLoans(res.data);

      } catch (error) {

        console.error("Loan history error:", error);
        alert("Failed to load loan history");

      } finally {
        setLoading(false);
      }

    };

    fetchLoans();

  }, []);

  return (

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold mb-6">
          Loan History
        </h1>

        <div className="bg-white p-6 rounded-lg shadow">

          {loading ? (

            <p className="text-gray-500">Loading loan history...</p>

          ) : (

            <table className="w-full">

              <thead>

                <tr className="border-b bg-gray-200">

                  <th className="p-3 text-left">Loan Type</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Income</th>
                  <th className="p-3 text-left">Credit Score</th>
                  <th className="p-3 text-left">Existing Loan</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Reason</th>

                </tr>

              </thead>

              <tbody>

                {loans.length === 0 ? (

                  <tr>
                    <td colSpan="7" className="text-center p-4 text-gray-500">
                      No loan history found
                    </td>
                  </tr>

                ) : (

                  loans.map((loan) => (

                    <tr key={loan.id} className="border-b hover:bg-gray-50">

                      <td className="p-3">{loan.loanType || "N/A"}</td>

                      <td className="p-3">
                        ₹{loan.loanAmount || 0}
                      </td>

                      <td className="p-3">
                        ₹{loan.income || 0}
                      </td>

                      <td className="p-3">
                        {loan.creditScore || "N/A"}
                      </td>

                      <td className="p-3">
                        ₹{loan.existingLoan || 0}
                      </td>

                      <td className="p-3">

                        {loan.status === "APPROVED" ? (

                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Approved
                          </span>

                        ) : (

                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Rejected
                          </span>

                        )}

                      </td>

                      <td className="p-3 text-gray-600">
                        {loan.reason || "No reason provided"}
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>

  );

}

export default LoanHistory;