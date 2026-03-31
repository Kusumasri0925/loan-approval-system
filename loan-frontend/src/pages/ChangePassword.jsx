import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ChangePassword() {

  const navigate = useNavigate();

  // ✅ Get user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.user?.id;

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const changePassword = async () => {

    if (!password) {
      alert("Please enter password");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (!userId) {
      alert("User not found. Please login again.");
      navigate("/login");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {

      await API.post("/api/auth/reset-password", {
        id: userId,
        password: password
      });

      alert("Password Updated Successfully");

      navigate("/login");

    } catch (error) {

      alert(error.response?.data || "Password update failed");

    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-80">

        <h2 className="text-xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        {/* Password Field */}
        <div className="relative mb-4">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter New Password"
            className="w-full border p-2 rounded pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="absolute right-3 top-2 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </span>

        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          onClick={changePassword}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

      </div>

    </div>

  );

}

export default ChangePassword;