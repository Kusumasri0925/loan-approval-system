import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard(){

const navigate = useNavigate();

const storedUser = JSON.parse(localStorage.getItem("user"));
const user = storedUser?.user;

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
Loan Dashboard
</h1>

{/* Profile Card */}

<div className="bg-white p-6 rounded-lg shadow mb-10">

<h2 className="text-xl font-semibold mb-4">
Profile Details
</h2>

<p><b>User ID:</b> {user?.id}</p>
<p><b>Name:</b> {user?.name}</p>
<p><b>Email:</b> {user?.email}</p>
<p><b>CIBIL Score:</b> {user?.cibilScore}</p>

<button
onClick={()=>navigate("/change-password")}
className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
>
Change Password
</button>

</div>

{/* Loan Cards */}

<div className="grid grid-cols-3 gap-6">

<div className="bg-white p-6 rounded-lg shadow">

<h2 className="text-xl font-semibold">
Personal Loan
</h2>

<p className="text-gray-500">
Interest Rate: 14%
</p>

<button
className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
onClick={()=>navigate("/apply-loan")}
>
Apply
</button>

</div>

<div className="bg-white p-6 rounded-lg shadow">

<h2 className="text-xl font-semibold">
Home Loan
</h2>

<p className="text-gray-500">
Interest Rate: 8%
</p>

<button
className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
onClick={()=>navigate("/apply-loan")}
>
Apply
</button>

</div>

<div className="bg-white p-6 rounded-lg shadow">

<h2 className="text-xl font-semibold">
Car Loan
</h2>

<p className="text-gray-500">
Interest Rate: 10%
</p>

<button
className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
onClick={()=>navigate("/apply-loan")}
>
Apply
</button>

</div>

</div>

</div>

</div>

)

}

export default Dashboard;