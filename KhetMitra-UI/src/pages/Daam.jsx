import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import DaamImage from "../assets/Daam.png";
import BazaarImage from "../assets/Bazaar.png";

const API_KEY = "579b464db66ec23bdd000001cce051d55c5546f641caf1d798e209b3";
const BASE_URL =
  "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

export default function MandiPriceApp() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Splash state
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}?api-key=${API_KEY}&format=json&limit=5000`)
      .then((res) => res.json())
      .then((res) => {
        const uniqueStates = [
          ...new Set(res.records.map((item) => item.state)),
        ].sort();
        setStates(uniqueStates);
      })
      .catch(() => setError("Failed to load states"));
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch(
        `${BASE_URL}?api-key=${API_KEY}&format=json&limit=5000&filters[state]=${encodeURIComponent(
          selectedState
        )}`
      )
        .then((res) => res.json())
        .then((res) => {
          const uniqueDistricts = [
            ...new Set(res.records.map((item) => item.district)),
          ].sort();
          setDistricts(uniqueDistricts);
          setSelectedDistrict("");
          setCommodities([]);
        });
    } else {
      setDistricts([]);
      setSelectedDistrict("");
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedState && selectedDistrict) {
      fetch(
        `${BASE_URL}?api-key=${API_KEY}&format=json&limit=5000&filters[state]=${encodeURIComponent(
          selectedState
        )}&filters[district]=${encodeURIComponent(selectedDistrict)}`
      )
        .then((res) => res.json())
        .then((res) => {
          const uniqueCommodities = [
            ...new Set(res.records.map((item) => item.commodity)),
          ].sort();
          setCommodities(uniqueCommodities);
          setSelectedCommodity("");
        });
    } else {
      setCommodities([]);
      setSelectedCommodity("");
    }
  }, [selectedDistrict]);

  const handleSubmit = () => {
    setSubmitted(true);
    setError("");
    if (selectedState && selectedDistrict && selectedCommodity) {
      setLoading(true);
      fetch(
        `${BASE_URL}?api-key=${API_KEY}&format=json&limit=5000&filters[state]=${encodeURIComponent(
          selectedState
        )}&filters[district]=${encodeURIComponent(
          selectedDistrict
        )}&filters[commodity]=${encodeURIComponent(selectedCommodity)}`
      )
        .then((res) => res.json())
        .then((res) => {
          setData(res.records || []);
          if (!res.records?.length) {
            setError("❌ Is combination ke liye koi daam available nahi hai.");
          }
          setLoading(false);
        });
    } else {
      setError("⚠️ Kripya State, District aur Commodity select karein!");
    }
  };

  return (
    <>
      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <img
              src={BazaarImage}
              alt="Splash"
              className="w-full h-full object-cover"
            />

            {/* Swipe Up Indicator */}
            <motion.div
              onClick={() => setShowSplash(false)}
              className="absolute bottom-12 flex flex-col items-center cursor-pointer select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              drag="y"
              dragConstraints={{ top: -100, bottom: 0 }}
              dragElastic={0.5}
              onDragEnd={(e, info) => {
                if (info.offset.y < -50) {
                  setShowSplash(false); // swipe up
                }
              }}
            >
              <span className="text-white text-sm mb-2 tracking-widest">
                SWIPE UP
              </span>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="w-6 h-6 border-l-2 border-b-2 border-white rotate-45"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App */}
      {!showSplash && (
        <>
          <Navbar />

          {/* Hero Section */}
          <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-[#f1f9f1] via-[#dff5e1] to-[#c8ebc5]">
            <img
              src={DaamImage}
              alt="Daam Farmer UI"
              className="w-[850px] max-w-full drop-shadow-2xl"
            />

            {/* Overlay Card */}
            <div className="absolute top-[18%] right-[6%] w-[360px] bg-gradient-to-br from-white/95 to-green-50/90 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-green-300">
              <h3 className="text-2xl font-extrabold text-green-800 mb-5 text-center drop-shadow-sm">
                🌾 Apna Mandi Daam Dekho
              </h3>

              {/* State */}
              <label className="block text-sm font-semibold text-green-900 mb-1">
                🗺️ State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-3 mb-4 border border-green-400 rounded-lg bg-white shadow-inner focus:ring-2 focus:ring-green-600"
              >
                <option value="">-- State Chune --</option>
                {states.map((st, idx) => (
                  <option key={idx} value={st}>
                    {st}
                  </option>
                ))}
              </select>

              {/* District */}
              <label className="block text-sm font-semibold text-green-900 mb-1">
                🏡 District
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedState}
                className="w-full p-3 mb-4 border border-green-400 rounded-lg bg-white shadow-inner focus:ring-2 focus:ring-green-600 disabled:opacity-50"
              >
                <option value="">-- District Chune --</option>
                {districts.map((dist, idx) => (
                  <option key={idx} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>

              {/* Commodity */}
              <label className="block text-sm font-semibold text-green-900 mb-1">
                🥦 Commodity
              </label>
              <select
                value={selectedCommodity}
                onChange={(e) => setSelectedCommodity(e.target.value)}
                disabled={!selectedDistrict}
                className="w-full p-3 mb-4 border border-green-400 rounded-lg bg-white shadow-inner focus:ring-2 focus:ring-green-600 disabled:opacity-50"
              >
                <option value="">-- Commodity Chune --</option>
                {commodities.map((com, idx) => (
                  <option key={idx} value={com}>
                    {com}
                  </option>
                ))}
              </select>

              {/* Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 mt-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition"
              >
                {loading ? "⏳ Loading..." : "📊 Daam Dikhao"}
              </button>

              {error && (
                <p className="mt-3 text-sm text-red-700 font-semibold text-center">
                  {error}
                </p>
              )}
            </div>
          </div>

          {/* Results Section */}
          {data.length > 0 && (
            <div className="max-w-6xl mx-auto mt-12 p-8 bg-gradient-to-br from-[#fefefe] to-[#f3fdf5] rounded-3xl shadow-2xl border border-green-200">
              <h2 className="text-3xl font-bold mb-6 text-green-800 flex items-center gap-2">
                📊 Mandi Daam
              </h2>
              <div className="overflow-x-auto rounded-lg border border-green-300 shadow-inner">
                <table className="min-w-full bg-white">
                  <thead className="bg-green-700 text-white sticky top-0 z-10">
                    <tr>
                      {[
                        "Mandi",
                        "Commodity",
                        "Variety",
                        "Min Price (₹)",
                        "Max Price (₹)",
                        "Modal Price (₹)",
                        "Date",
                      ].map((head, idx) => (
                        <th
                          key={idx}
                          className="px-4 py-3 text-left font-semibold text-sm"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-green-100">
                    {data.map((item, i) => (
                      <tr
                        key={i}
                        className="hover:bg-green-50 transition cursor-pointer"
                      >
                        <td className="px-4 py-2">{item.market}</td>
                        <td className="px-4 py-2">{item.commodity}</td>
                        <td className="px-4 py-2">{item.variety}</td>
                        <td className="px-4 py-2 text-green-800 font-medium">
                          ₹{item.min_price}
                        </td>
                        <td className="px-4 py-2 text-green-800 font-medium">
                          ₹{item.max_price}
                        </td>
                        <td className="px-4 py-2 text-green-900 font-bold">
                          ₹{item.modal_price}
                        </td>
                        <td className="px-4 py-2">{item.arrival_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}







// import Navbar from "../components/Navbar";
// import { motion } from "framer-motion";
// import { Heart, TrendingUp, Smile, Sparkles } from "lucide-react";

// export default function MandiPriceApp() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-green-200">
//       <Navbar />

//       <main className="flex flex-col items-center justify-center text-center px-6 py-24">
//         {/* Animated Icon */}
//         <motion.div
//           className="bg-green-700 text-white p-6 rounded-full shadow-xl mb-6"
//           animate={{ scale: [1, 1.08, 1] }}
//           transition={{ repeat: Infinity, duration: 1.5 }}
//         >
//           <TrendingUp className="w-12 h-12" />
//         </motion.div>

//         {/* Heading */}
//         <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4">
//           🥔 Aloo Is Checking the Prices…
//         </h1>

//         <p className="text-lg text-green-800 max-w-xl mb-8">
//           Aloo wants to be 100% sure before showing mandi prices 📊  
//           No wrong daam, only honest daam 🤝
//         </p>

//         {/* Cute Card */}
//         <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-green-200 p-8 max-w-lg w-full">
//           <div className="flex items-center justify-center gap-2 mb-4">
//             <Smile className="w-6 h-6 text-green-600" />
//             <h2 className="text-2xl font-bold text-green-800">
//               Team Aloo Intelligence 🥔💚
//             </h2>
//           </div>

//           <p className="text-green-700 mb-4">
//             Our little Aloo is talking to mandis,  
//             checking data twice, and polishing numbers ✨
//           </p>

//           <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
//             <p className="font-semibold text-green-800">
//               📢 Aloo says:
//             </p>
//             <p className="text-sm text-green-700">
//               “Please wait a bit…  
//               I don’t want to show you the wrong price 😌”
//             </p>
//           </div>

//           <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
//             <p className="font-semibold text-yellow-800">
//               ❤️ All 4 Aloo are cross-checking together!
//             </p>
//             <p className="text-sm text-yellow-700">
//               Accurate mandi prices coming very soon 🚜
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-10 flex items-center gap-2 text-green-800 font-medium">
//           <Sparkles className="w-5 h-5" />
//           Honest prices. Happy farmers. Aloo promise 🥔🤍
//         </div>
//       </main>
//     </div>
//   );
// }
