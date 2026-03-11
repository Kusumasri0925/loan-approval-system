import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cibilScore: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const register = async () => {

    try {

      await API.post("/api/auth/register", user);

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      console.error(error);
      alert("Registration Failed");

    }

  };

  return (

    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <input
          className="w-full p-2 border rounded mb-4"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
type="email"
name="email"
placeholder="Enter Email"
className="w-full border p-2 mb-4"
onChange={handleChange}
required
/>

        <input
          className="w-full p-2 border rounded mb-4"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <input
          className="w-full p-2 border rounded mb-4"
          name="cibilScore"
          placeholder="CIBIL Score"
          onChange={handleChange}
        />

        <button
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          onClick={register}
        >
          Register
        </button>

        <p
          className="text-sm text-center mt-4 cursor-pointer text-blue-500"
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </p>

      </div>

    </div>

  );

}

export default Register;