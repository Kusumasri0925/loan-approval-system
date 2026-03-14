import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function LoanResult() {

const location = useLocation();
const navigate = useNavigate();

const result = location.state;

if (!result) {
return (
<div className="p-10 text-xl">
No result
</div>
);
}

return (

<div className="flex min-h-screen bg-gray-100">

<Sidebar />

<div className="flex-1 flex items-center justify-center">

<div className="bg-white p-8 rounded-lg shadow-lg w-[450px] text-center">

<h2 className="text-2xl font-bold mb-4">
Loan Result
</h2>

<p className="text-lg mb-4">
Loan Type: <b>{result.loanType}</b>
</p>

<p className="text-lg mb-4">
Loan Amount: ₹{result.loanAmount}
</p>

<p
className={
result.status === "APPROVED"
? "text-green-600 text-xl font-bold"
: "text-red-600 text-xl font-bold"
}
>
Status: {result.status}
</p>

<p className="mt-4 text-gray-600">
Reason: {result.reason}
</p>

<button
onClick={() => navigate("/dashboard")}
className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
>
Back to Dashboard
</button>

</div>

</div>

</div>

);

}

export default LoanResult;