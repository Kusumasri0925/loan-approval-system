import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cibilScore: "",
    income: ""   // ✅ ADDED
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const register = async () => {

    // ✅ UPDATED VALIDATION
    if (!user.name || !user.email || !user.password || !user.cibilScore || !user.income) {
      alert("Please fill all fields");
      return;
    }

    if (user.income < 1000) {
      alert("Income must be at least 1000");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {

      const res = await API.post("/api/auth/register", user);

      alert(res.data);

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert(error.response?.data || "Registration Failed");

    } finally {
      setLoading(false);
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
          value={user.name}
          onChange={handleChange}
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full border p-2 rounded mb-4"
          value={user.email}
          onChange={handleChange}
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            className="w-full p-2 border rounded pr-10"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            value={user.password}
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
          value={user.cibilScore}
          onChange={handleChange}
        />

        {/* ✅ NEW: INCOME FIELD */}
        <input
          className="w-full p-2 border rounded mb-4"
          name="income"
          type="number"
          placeholder="Enter Monthly Income (₹)"
          value={user.income}
          onChange={handleChange}
        />

        {/* Register Button */}
        <button
          disabled={loading}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          onClick={register}
        >
          {loading ? "Registering..." : "Register"}
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