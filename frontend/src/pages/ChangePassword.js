import React,{useState} from "react";
import API from "../services/api";

function ChangePassword(){

const [password,setPassword] = useState("");

const changePassword = async()=>{

const email = localStorage.getItem("userEmail");

await API.post("/api/auth/change-password",{
email:email,
password:password
});

alert("Password Updated");

};

return(

<div className="h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-8 rounded shadow w-80">

<h2 className="text-xl font-bold mb-4">
Change Password
</h2>

<input
type="password"
placeholder="New Password"
className="w-full border p-2 mb-4"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="w-full bg-blue-500 text-white p-2 rounded"
onClick={changePassword}
>
Update Password
</button>

</div>

</div>

)

}

export default ChangePassword;