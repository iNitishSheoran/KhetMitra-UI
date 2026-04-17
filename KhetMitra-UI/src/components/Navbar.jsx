import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import { BASE_URL } from "../config";
import { useUser } from "../context/UserContext.jsx"; // ⬅️ updated

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { isAuthenticated, user, refreshUser } = useUser(); // ⬅️ updated
  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      refreshUser(); // clear user data
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-[#0D1F1B] via-[#1B4332] to-[#081C15] text-white flex fixed top-0 left-0 items-center justify-between pl-4 pr-6 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.6)] w-full z-[50] border-b border-[#4ADE80]/40">
      
      {/* Logo */}
      <Link to="/">
        <div className="flex items-center space-x-3 text-[#4ADE80] text-2xl font-extrabold hover:scale-105 transition-transform">
          <img
            src={logo}
            alt="Logo"
            className="w-14 h-14 ml-5 rounded-full shadow-md object-cover"
          />
          <span className="text-white hover:text-[#FFD95A] transition-colors">
            KhetMitra
          </span>
        </div>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex space-x-8 text-lg font-medium">
        <Link to="/diagnose" className="hover:text-[#4ADE80] hover:scale-105 transition-all duration-200">Diagnose</Link>
        <Link to="/about" className="hover:text-[#4ADE80] hover:scale-105 transition-all duration-200">About Us</Link>
        <Link to="/help" className="hover:text-[#4ADE80] hover:scale-105 transition-all duration-200">Help</Link>
        <Link to="/cropData" className="hover:text-[#4ADE80] hover:scale-105 transition-all duration-200">Crop Data</Link>
        <Link to="/daam" className="hover:text-[#4ADE80] hover:scale-105 transition-all duration-200">BazaarBhav</Link>
        <Link to="/kmstudio" className="hover:text-[#FACC15] hover:scale-110 text-cyan-200 transition-all duration-300">KM-Studio</Link>
        <Link to="/shopping" className="hover:text-[#da6262] hover:scale-105 text-red-300 transition-all duration-200">Shop 🛒</Link>
      </div>

      {/* Profile */}
      <div className="relative pr-2" ref={dropdownRef}>
        <img
          src={user?.photoUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
          onClick={() => setShowDropdown(prev => !prev)}
          className="h-11 w-11 rounded-full object-cover cursor-pointer border-2 border-[#FFD95A] hover:shadow-[0_0_12px_#FFD95A] transition"
          alt="profile"
        />

        {showDropdown && (
          <div className="absolute top-[120%] right-0 mt-2 w-52 bg-[#1B1B1B] text-white rounded-lg shadow-lg flex flex-col border border-[#4ADE80] z-[9999]">
            
            {/* Mobile Nav Links */}
            <div className="md:hidden flex flex-col">
              <Link to="/" className="px-4 py-2 hover:bg-[#4ADE80]/20">Home</Link>
              <Link to="/diagnose" className="px-4 py-2 hover:bg-[#4ADE80]/20">Diagnose</Link>
              <Link to="/cropData" className="px-4 py-2 hover:bg-[#4ADE80]/20">Crop Data</Link>
              <Link to="/about" className="px-4 py-2 hover:bg-[#4ADE80]/20">About Us</Link>
              <Link to="/help" className="px-4 py-2 hover:bg-[#4ADE80]/20">Help</Link>
              <Link to="/daam" className="px-4 py-2 hover:bg-[#4ADE80]/20">Daam</Link>
              <Link to="/kmstudio" className="px-4 py-2 hover:bg-[#4ADE80]/20">KM-Studio</Link>
              <Link to="/shopping" className="px-4 py-2 hover:bg-[#4ADE80]/20">Shop us 🛒</Link>
            </div>

            {!isAuthenticated && (
              <Link to="/signup" className="px-4 py-2 hover:bg-[#4ADE80]/20">Sign up</Link>
            )}

            {user && (
              <>
                <Link to="/myProfile" className="px-4 py-2 hover:bg-[#4ADE80]/20 border-t border-gray-700">My Profile</Link>
                {user?.isAdmin ? (
                  <Link to="/allHelp" className="px-4 py-2 hover:bg-[#4ADE80]/20">All Help</Link>
                  
                ) : (
                  <Link to="/my-requests" className="px-4 py-2 hover:bg-[#4ADE80]/20">My Requests</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left text-red-300 hover:bg-red-600/20 border-t border-gray-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
