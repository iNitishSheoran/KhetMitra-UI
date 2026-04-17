// src/components/Login.jsx
import React, { useState, forwardRef } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

// ⬇️ InputField Component
const InputField = forwardRef(({ icon: Icon, children, ...props }, ref) => (
  <div className="relative flex items-center border border-green-300 rounded-xl p-3 bg-white/30 backdrop-blur-md focus-within:ring-2 focus-within:ring-green-500 transition shadow-sm hover:shadow-md">
    <Icon className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
    <input
      ref={ref}
      {...props}
      className="w-full outline-none bg-transparent placeholder-gray-600 pr-10"
    />
    {children}
  </div>
));

export default function Login() {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();
  const [form, setForm] = useState({
    emailId: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${BASE_URL}/login`, form, { withCredentials: true });
      setMessage(res.data?.message || "Login successful");

      localStorage.setItem("user", JSON.stringify(res.data.user || {}));
      if (refreshAuth) await refreshAuth();

      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || "❌ Login failed";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-green-50 to-amber-100 px-4">
      <div className="bg-white/20 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-green-800 mb-6 text-center">🌾 KhetMitra Login</h2>

        {message && <p className="text-center text-red-500 mb-4 animate-pulse">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            icon={Mail}
            type="email"
            name="emailId"
            value={form.emailId}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />

          <InputField
            icon={Lock}
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          >
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 p-1 focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </InputField>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {/* 🌟 Forgot Password Link */}
          <p className="text-center mt-3">
            <span
              // onClick={() => navigate("/forgot-password")}
              className="text-sm text-green-700 cursor-pointer font-medium hover:underline hover:text-green-900 transition"
            >
              Forgot your password?
            </span>
          </p>
        </form>


        <p className="mt-6 text-center text-sm text-gray-700">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-700 cursor-pointer font-medium hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
