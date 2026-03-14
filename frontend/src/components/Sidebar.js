import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {

const navigate = useNavigate();
const location = useLocation();

return (

<div className="w-64 bg-gray-100 min-h-screen p-6 shadow">

<h2 className="text-xl font-bold mb-8">
Loan Approval Dashboard
</h2>

<ul className="space-y-4">

<li
onClick={() => navigate("/dashboard")}
className={`cursor-pointer p-2 rounded ${
location.pathname === "/dashboard"
? "bg-blue-200 font-semibold"
: ""
}`}
>
Dashboard
</li>

<li
onClick={() => navigate("/apply-loan")}
className={`cursor-pointer p-2 rounded ${
location.pathname === "/apply-loan"
? "bg-blue-200 font-semibold"
: ""
}`}
>
Available Loans
</li>

<li
onClick={() => navigate("/loan-history")}
className={`cursor-pointer p-2 rounded ${
location.pathname === "/loan-history"
? "bg-blue-200 font-semibold"
: ""
}`}
>
Applied Loans
</li>

<li
className="cursor-pointer text-red-500 mt-10"
onClick={()=>{
localStorage.clear();
navigate("/");
}}
>
Logout
</li>

</ul>

</div>

);

}

export default Sidebar;