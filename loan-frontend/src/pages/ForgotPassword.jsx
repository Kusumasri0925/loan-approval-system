import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sendLink = async () => {

    // ✅ Gmail validation
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!email) {
      alert("Please enter email");
      return;
    }

    if (!gmailRegex.test(email)) {
      alert("Enter valid Gmail address");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {

      await API.post("/api/auth/forgot-password", { email });

      alert("Email verified. Now reset your password.");

      // ✅ Move to reset page
      navigate("/reset-password");

    } catch (error) {

      alert(error.response?.data || "User not found");

    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4">
          Forgot Password
        </h2>

        <input
          className="w-full border p-2 mb-4"
          placeholder="Enter Gmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          onClick={sendLink}
        >
          {loading ? "Checking..." : "Continue"}
        </button>

      </div>

    </div>

  );

}

export default ForgotPassword;