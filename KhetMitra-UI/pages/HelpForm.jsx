import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import HelpImage from "../assets/Help.png";
import Navbar from "../components/Navbar";

export default function HelpForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    state: "",
    district: "",
    phoneNo: "",
    email: "",
    help: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Send JSON directly
      const res = await axios.post(`${BASE_URL}/help/submit`, form, {
        withCredentials: true,
      });

      setMessage(res.data.message || "✅ Request submitted successfully!");

      // Reset form
      setForm({
        name: "",
        state: "",
        district: "",
        phoneNo: "",
        email: "",
        help: "",
      });

      // Clear message after 3s
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
  console.log(err); // for debugging

  if (err.response?.status === 401) {
    setMessage("Please Login to send Help Requests");
  } else {
    setMessage(err.response?.data?.error || "❌ Failed to submit request");
  }

  setTimeout(() => setMessage(""), 3000);
  setLoading(false);
}
  };

  return (
    <div className="min-h-screen bg-[#bddcb8] flex flex-col items-center px-4 py-10">
      <Navbar/>
      <div className="h-16 w-full"></div>

      <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-8 text-center">
        सहायता अनुरोध (Help Request)
      </h2>

      <div className="max-w-5xl w-full bg-[#e1fbdd] shadow-lg rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
        {/* Left image */}
        <div className="flex justify-center items-center">
          <img
            src={HelpImage}
            alt="Help"
            className="rounded-lg shadow-md w-full max-w-sm"
          />
        </div>

        {/* Right form */}
        <div className="flex flex-col justify-center">
          {message && (
            <div className="text-center mb-4 text-sm font-medium text-red-500">
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="आपका नाम (Name)"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="राज्य (State)"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <input
              type="text"
              name="district"
              value={form.district}
              onChange={handleChange}
              placeholder="जिला (District)"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <input
              type="text"
              name="phoneNo"
              value={form.phoneNo}
              onChange={handleChange}
              placeholder="फोन नंबर (10 अंक)"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ईमेल (Email)"
              className="md:col-span-2 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <textarea
              name="help"
              value={form.help}
              onChange={handleChange}
              placeholder="अपनी समस्या का विवरण लिखें (Describe your issue)"
              rows="4"
              className="md:col-span-2 w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
              required
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition duration-200"
            >
              {loading ? "सबमिट हो रहा है..." : "अनुरोध सबमिट करें"}
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex justify-center md:justify-start gap-6 mt-6 text-gray-600 text-sm">
            <p>📞 +91 79881 00765</p>
            <p>✉️ khetmitra23@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}












// import Navbar from "../components/Navbar";
// import { HeartHandshake, Smile, Sparkles } from "lucide-react";

// export default function HelpForm() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
//       <Navbar />

//       <main className="flex flex-col items-center justify-center text-center px-6 py-20">
//         {/* Cute Icon */}
//         <div className="bg-green-600 text-white p-5 rounded-full shadow-lg mb-6 animate-bounce">
//           <HeartHandshake className="w-12 h-12" />
//         </div>

//         {/* Heading */}
//         <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-4">
//           🥔 Aloo needs help too!
//         </h1>

//         <p className="text-lg text-gray-700 max-w-xl mb-8">
//           Before helping farmers,  
//           our Aloo is learning, training, and getting smarter 🤓🌱  
//         </p>

//         {/* Funny Card */}
//         <div className="bg-white rounded-2xl shadow-xl border border-green-200 p-8 max-w-lg w-full">
//           <div className="flex items-center justify-center gap-2 mb-4">
//             <Smile className="w-6 h-6 text-green-600" />
//             <h2 className="text-2xl font-bold text-green-700">
//               Team Aloo Intelligence 🥔❤️
//             </h2>
//           </div>

//           <p className="text-gray-700 mb-4">
//             Aloo says:
//           </p>

//           <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
//             <p className="text-green-800 font-semibold">
//               🥺 “Mujhe thoda time do…”
//             </p>
//             <p className="text-sm text-green-700">
//               Main expert se seekh raha hoon,  
//               taaki main aapki madad aur achhe se kar sakoon 🌾
//             </p>
//           </div>

//           <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
//             <p className="font-semibold text-yellow-800">
//               💪 All 4 Aloo are working together!
//             </p>
//             <p className="text-sm text-yellow-700">
//               Jab Aloo ready hoga, help bhi rocket speed se aayegi 🚀
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-10 flex items-center gap-2 text-green-700 font-medium">
//           <Sparkles className="w-5 h-5" />
//           With love, patience & Aloo 🥔💚
//         </div>
//       </main>
//     </div>
//   );
// }
