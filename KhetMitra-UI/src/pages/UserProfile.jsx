import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaPhoneAlt, FaLeaf, FaMapMarkerAlt, FaUser, FaTractor } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import { useUser } from "../context/UserContext.jsx"; // ✅ Context

export default function UserProfile() {
  const { user, loading } = useUser(); // ✅ Data from context
  const [isImageOpen, setIsImageOpen] = useState(false);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-100 to-yellow-100">
        <ClipLoader color="#22c55e" size={60} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-yellow-100 text-red-600">
        <p>Failed to load profile</p>
      </div>
    );
  }

  // ✅ Default profile pic
  const imageUrl =
    user?.photoUrl ||
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";

  return (
    <div className="relative">
      <Navbar />

      {/* 🌅 Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-green-100 to-sky-200"></div>

      <div className="min-h-screen relative pt-[7rem] px-4 flex justify-center items-start pb-[6rem]">
        <div className="bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl max-w-3xl w-full p-10 border border-white/50">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
              Welcome, {user?.fullName?.split(" ")[0] || "Farmer"} 🌾
            </h2>
            <p className="text-green-700 text-sm mt-2 flex items-center justify-center gap-2">
              <FaTractor className="text-green-600" /> Your farming dashboard
            </p>
          </div>

          {/* Profile Info */}
          <div className="flex flex-col items-center gap-4">
            <img
              src={imageUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white/60 cursor-pointer"
              onClick={() => setIsImageOpen(true)}
            />

            <h3 className="text-2xl font-semibold text-green-900">
              {user?.fullName || "Name not provided"}
            </h3>
            <p className="text-green-700 font-medium mt-1 flex items-center gap-2">
              <MdEmail /> {user?.emailId || "No email"}
            </p>
            <Link to="/editProfile">
              <button className="mt-4 px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition">
                ✏️ Edit Profile
              </button>
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-green-300"></div>
            <FaLeaf className="mx-3 text-green-600" />
            <div className="flex-grow border-t border-green-300"></div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailCard icon={<FaPhoneAlt />} label="Phone" value={user?.phoneNumber} />
            <DetailCard icon={<FaMapMarkerAlt />} label="State" value={user?.state} />
            <DetailCard icon={<FaMapMarkerAlt />} label="District" value={user?.district} />
            <DetailCard
              icon={<FaLeaf />}
              label="Crops"
              value={user?.crops?.length ? user.crops.join(", ") : "Not provided"}
            />
            <DetailCard icon={<FaUser />} label="Age" value={user?.age} />
            <DetailCard
              icon={<FaUser />}
              label="KCC"
              value={<span className="text-gray-400">Only updated by banks</span>}
            />
          </div>
        </div>
      </div>

      {/* Enlarged Profile Image */}
      {isImageOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={() => setIsImageOpen(false)}
        >
          <div
            className="relative backdrop-blur-md bg-white/70 p-6 rounded-2xl shadow-2xl border border-green-200"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageUrl}
              alt="Enlarged Profile"
              className="w-64 h-64 rounded-full object-cover border-4 border-green-500"
            />
            <button
              onClick={() => setIsImageOpen(false)}
              className="absolute -top-2 -right-2 bg-red-600 text-white font-bold w-7 h-7 flex items-center justify-center rounded-md shadow hover:bg-red-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ✅ Reusable detail card
function DetailCard({ icon, label, value }) {
  return (
    <div className="bg-white/40 backdrop-blur-md border border-green-200 p-5 rounded-2xl shadow-md hover:shadow-xl transition transform hover:scale-105">
      <div className="flex items-center gap-3 text-green-700 text-sm font-semibold mb-2">
        <span className="text-lg">{icon}</span>
        {label}
      </div>
      <p className="text-green-900 pl-8 text-base">{value || "Not provided"}</p>
    </div>
  );
}
