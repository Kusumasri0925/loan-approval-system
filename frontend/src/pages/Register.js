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

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const register = async () => {

    try {

      await API.post("/api/auth/register", user);

      alert("Registration Successful. Check your email to verify your account.");

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert(error.response?.data || "Registration Failed");

    }

  };

  return (

    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        {/* Name */}

        <input
          className="w-full p-2 border rounded mb-4"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        {/* Email */}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full border p-2 rounded mb-4"
          onChange={handleChange}
          required
        />

        {/* Password with Eye Icon */}

        <div className="relative mb-4">

          <input
            className="w-full p-2 border rounded pr-10"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />

          <span
            className="absolute right-3 top-2 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </span>

        </div>

        {/* CIBIL Score */}

        <input
          className="w-full p-2 border rounded mb-4"
          name="cibilScore"
          type="number"
          placeholder="Enter CIBIL Score"
          onChange={handleChange}
        />

        {/* Register Button */}

        <button
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          onClick={register}
        >
          Register
        </button>

        {/* Login Redirect */}

        <p
          className="text-sm text-center mt-4 cursor-pointer text-blue-500"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </p>

      </div>

    </div>

  );

}

export default Register;