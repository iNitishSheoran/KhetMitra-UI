// src/components/Signup.jsx
import React, { useState, forwardRef } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import farmerImg from "../assets/indian-farmer.png";

// Icons
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Leaf,
  Calendar,
  Fingerprint,
} from "lucide-react";

// ⬇️ InputField moved outside component + forwardRef to preserve focus
const InputField = forwardRef(({ icon: Icon, ...props }, ref) => (
  <div className="flex items-center border border-green-300 rounded-xl p-3 bg-white/30 backdrop-blur-md focus-within:ring-2 focus-within:ring-green-500 transition shadow-sm hover:shadow-md">
    <Icon className="w-5 h-5 text-green-600 mr-2" />
    <input
      ref={ref}
      {...props}
      className="w-full outline-none bg-transparent placeholder-gray-600"
    />
  </div>
));

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    emailId: "",
    password: "",
    state: "",
    district: "",
    crops: "",
    age: "",
  });
  const [loading, setLoading] = useState(false);
  const [bioLoading, setBioLoading] = useState(false); // 🔹 new biometric loader
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log("Field updated:", e.target.name, "→", e.target.value); // ✅ debug
  };

  // Normal form signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${BASE_URL}/signup`, form, {
        withCredentials: true,
      });
      setMessage(res.data?.message || "✅ Account created");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Signup failed";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 New biometric signup
  const handleBiometricSignup = async () => {
    try {
      setBioLoading(true);
      setMessage("");
      const res = await axios.post(`${BASE_URL}/api/biometric/enroll`, {
        sensorModel: "R307S",
      });
      if (res.data.success) {
        setMessage("✅ Biometric signup successful!");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage("⚠️ Biometric signup failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage(
        "❌ Error: Unable to fetch data from Aadhaar servers. Please try again later."
      );
    } finally {
      setBioLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-green-50 to-amber-100 px-4">
      <div className="flex flex-col md:flex-row bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full relative">
        {/* Illustration Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-100 to-green-50 items-center justify-center p-8 relative">
          <img
            src={farmerImg}
            alt="Farmer illustration"
            className="w-full max-h-[550px] object-contain rounded-2xl shadow-2xl -translate-y-4"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-green-800 text-center mb-6 flex items-center justify-center gap-2">
            🌾 Join <span className="text-green-700">KhetMitra</span>
          </h2>

          {message && (
            <p
              className={`text-center mb-4 font-medium animate-pulse ${
                message.includes("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          {/* Normal signup form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <InputField
              icon={User}
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
            <InputField
              icon={Phone}
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
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
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <InputField
              icon={MapPin}
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              required
            />
            <InputField
              icon={MapPin}
              type="text"
              name="district"
              value={form.district}
              onChange={handleChange}
              placeholder="District"
              required
            />
            <InputField
              icon={Leaf}
              type="text"
              name="crops"
              value={form.crops}
              onChange={handleChange}
              placeholder="Crops you're growing"
              required
            />
            <InputField
              icon={Calendar}
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Age"
              required
            />
            {/* <InputField
              icon={User} // ✅ different icon
              type="text"
              name="cropHistory"
              value={form.cropHistory}
              onChange={handleChange}
              placeholder="Crop History"
              required
            /> */}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl"
              >
                {loading ? "🌱 Creating account..." : "🌱 Sign Up"}
              </button>
            </div>
          </form>

          {/* 🔹 Biometric Signup Button */}
          <div className="mt-4">
            <button
              onClick={handleBiometricSignup}
              disabled={bioLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl"
            >
              <Fingerprint className="w-5 h-5" />
              {bioLoading
                ? "🔄 Scanning Fingerprint..."
                : "Use Fingerprint to Sign Up"}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-700">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-green-700 cursor-pointer font-medium hover:underline"
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
