import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function ChangePassword() {

  const { id } = useParams();   // get user id from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const changePassword = async () => {

    try {

      await API.post("/api/auth/reset-password", {
        id: id,
        password: password
      });

      alert("Password Updated Successfully");

      navigate("/login");

    } catch (error) {

      alert("Password update failed");

    }

  };

  return (

    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-80">

        <h2 className="text-xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        {/* Password Field with Eye Icon */}

        <div className="relative mb-4">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter New Password"
            className="w-full border p-2 rounded pr-10"
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
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={changePassword}
        >
          Update Password
        </button>

      </div>

    </div>

  );

}

export default ChangePassword;