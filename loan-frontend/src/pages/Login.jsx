import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = async () => {

    // ✅ Gmail validation
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!user.email || !user.password) {
      alert("Please enter email and password");
      return;
    }

    if (!gmailRegex.test(user.email)) {
      alert("Please enter a valid Gmail address");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {

      const res = await API.post("/api/auth/login", user);

      // ✅ Store user
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert(error.response?.data || "Login failed");

    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-80">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        {/* Email */}
        <input
          className="w-full p-2 border rounded mb-4"
          name="email"
          type="email"
          placeholder="Enter Gmail"
          value={user.email}
          onChange={handleChange}
        />

        {/* Password */}
        <div className="relative mb-4">

          <input
            className="w-full p-2 border rounded pr-10"
            name="password"
            type={showPassword ? "text" : "password"}
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

        {/* Forgot Password */}
        <p
          className="text-blue-500 cursor-pointer mb-4 text-sm text-right"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>

        {/* Login Button */}
        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          onClick={login}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register Button */}
        <button
          className="w-full bg-green-500 text-white p-2 rounded mt-3 hover:bg-green-600 transition"
          onClick={() => navigate("/register")}
        >
          Register
        </button>

      </div>

    </div>

  );

}

export default Login;