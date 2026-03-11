import React,{useState} from "react";
import API from "../services/api";

function ForgotPassword(){

const [email,setEmail] = useState("");

const sendLink = async()=>{

try{

await API.post("/api/auth/forgot-password",{email});

alert("Reset link sent to email");

}catch(error){

alert("User not found");

}

};

return(

<div className="h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-8 rounded shadow w-80">

<h2 className="text-xl font-bold mb-4">
Forgot Password
</h2>

<input
className="w-full border p-2 mb-4"
placeholder="Enter Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<button
className="w-full bg-blue-500 text-white p-2 rounded"
onClick={sendLink}
>
Send Reset Link
</button>

</div>

</div>

)

}

export default ForgotPassword;