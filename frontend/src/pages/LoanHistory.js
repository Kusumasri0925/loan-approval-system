import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function LoanHistory() {

const [loans,setLoans] = useState([]);
const navigate = useNavigate();

useEffect(()=>{

const fetchLoans = async()=>{

try{

const storedUser = JSON.parse(localStorage.getItem("user"));

const userId = storedUser.user.id;

const res = await API.get(`/api/loan/history/${userId}`);

setLoans(res.data);

}catch(error){

console.log(error);
alert("Failed to load loan history");

}

};

fetchLoans();

},[]);

return(

<div className="flex h-screen bg-gray-100">

{/* Sidebar */}

<div className="w-64 bg-blue-700 text-white p-6">

<h1 className="text-2xl font-bold mb-10">
Loan System
</h1>

<ul className="space-y-4">

<li
className="cursor-pointer hover:text-gray-200"
onClick={()=>navigate("/dashboard")}
>
Dashboard
</li>

<li
className="cursor-pointer hover:text-gray-200"
onClick={()=>navigate("/apply-loan")}
>
Apply Loan
</li>

<li
className="cursor-pointer hover:text-gray-200"
onClick={()=>navigate("/loan-history")}
>
Loan History
</li>

<li
className="cursor-pointer hover:text-gray-200"
onClick={()=>{
localStorage.removeItem("user");
navigate("/");
}}
>
Logout
</li>

</ul>

</div>

{/* Main Content */}

<div className="flex-1 p-10">

<h1 className="text-3xl font-bold mb-6">
Loan History
</h1>

<div className="bg-white p-6 rounded-lg shadow">

<table className="w-full">

<thead>

<tr className="border-b">

<th className="p-2 text-left">Loan Type</th>
<th className="p-2 text-left">Amount</th>
<th className="p-2 text-left">Income</th>
<th className="p-2 text-left">Credit Score</th>
<th className="p-2 text-left">Status</th>
<th className="p-2 text-left">Reason</th>

</tr>

</thead>

<tbody>

{loans.length === 0 ? (

<tr>
<td colSpan="6" className="text-center p-4 text-gray-500">
No loan history found
</td>
</tr>

) : (

loans.map((loan)=>(
<tr key={loan.id} className="border-b">

<td className="p-2">{loan.loanType}</td>

<td className="p-2">
₹{loan.loanAmount}
</td>

<td className="p-2">
₹{loan.income}
</td>

<td className="p-2">
{loan.creditScore}
</td>

<td
className={
loan.status === "APPROVED"
? "p-2 text-green-600 font-bold"
: "p-2 text-red-600 font-bold"
}
>
{loan.status}
</td>

<td className="p-2 text-gray-600">
{loan.reason}
</td>

</tr>
))

)}

</tbody>

</table>

</div>

</div>

</div>

);

}

export default LoanHistory;