import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import Navbar from "../components/Navbar";
import {
  Sprout,
  Droplet,
  Leaf,
  Thermometer,
  CloudRain,
  FlaskConical,
  Info,
} from "lucide-react";

export default function CropPage() {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [cropDetails, setCropDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch crop list
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/crop/all`);
        setCrops(res.data.crops);
      } catch (err) {
        console.error(err);
        setError("🌾 Oops! We couldn’t fetch crops. Please try again.");
      }
    };
    fetchCrops();
  }, []);

  // Fetch crop details.
  useEffect(() => {
    if (!selectedCrop) return;

    const fetchCropDetails = async () => {
  setLoading(true);
  try {
    const res = await axios.get(
      `${BASE_URL}/crop/details?name=${encodeURIComponent(selectedCrop)}`
    );
    setTimeout(() => {
      setCropDetails(res.data.crop);
      setLoading(false);
    }, 400);
  } catch (err) {
    console.error(err);
    setError("🚜 Crop data not found. Please try another crop.");
    setLoading(false);
  }
};

    fetchCropDetails();
  }, [selectedCrop]);

  const renderObject = (obj) => (
    <ul className="ml-5 list-disc space-y-1 text-gray-700">
      {Object.entries(obj).map(([key, value]) => (
        <li key={key}>
          <strong className="capitalize text-green-700">
            {key.replace(/_/g, " ")}:
          </strong>{" "}
          {Array.isArray(value)
            ? value.join(" – ")
            : typeof value === "object"
            ? renderObject(value)
            : value}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 mt-16 space-y-8">
      <Navbar/>
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center text-green-800 flex items-center justify-center gap-2">
        <Sprout className="w-8 h-8 text-green-600" />
        Crop Details & Cultivation Guide
      </h1>
      <p className="text-center text-gray-600">
        Select a crop below to explore cultivation requirements, timeline, and
        best practices 🌱
      </p>

      {/* Dropdown Section with Background Image */}
      <div
        className="relative w-full rounded-2xl overflow-hidden shadow-lg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-green-900 bg-opacity-50"></div>
        <div className="relative p-8 flex justify-center">
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full md:w-2/3 p-3 rounded-xl shadow-md bg-white border border-green-400 focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="">-- Select a Crop --</option>
            {crops.map((crop) => (
              <option key={crop._id} value={crop.name || crop.name_en}>
                {crop.name || crop.name_en}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl p-4 shadow-md flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => setError("")}
            className="ml-4 px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg text-sm"
          >
            Got it
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="animate-pulse p-6 bg-green-50 rounded-lg text-center text-green-700 shadow-md">
          🌿 Fetching crop details...
        </div>
      )}

      {/* Crop Details */}
      {cropDetails && !loading && (
        <div className="space-y-6">
          {/* Crop Name */}
          <div className="bg-gradient-to-r from-green-100 to-green-200 border border-green-300 rounded-xl p-5 shadow-lg">
            <h2 className="text-2xl font-bold text-green-900">
              {cropDetails.name_hi || cropDetails.name_en || cropDetails.name}
            </h2>
          </div>

          {/* Crop Requirements */}
          {cropDetails.npk && (
            <div className="bg-white border border-green-200 rounded-xl p-5 shadow-lg space-y-3">
              <h3 className="text-xl font-semibold text-green-700 flex items-center gap-2">
                <Info className="w-6 h-6 text-green-600" /> Crop Requirements
              </h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                {Object.entries(cropDetails.npk).map(([key, val]) => (
                  <li key={key}>
                    <strong className="text-green-700">{key.toUpperCase()}:</strong>{" "}
                    {Array.isArray(val) ? val.join(" – ") : val}
                  </li>
                ))}
                {cropDetails.temperature_c && (
                  <li>
                    <Thermometer className="inline mr-2 text-red-500" />{" "}
                    {cropDetails.temperature_c.join(" – ")} °C
                  </li>
                )}
                {cropDetails.humidity_percent && (
                  <li>
                    <CloudRain className="inline mr-2 text-blue-500" />{" "}
                    {cropDetails.humidity_percent.join(" – ")} %
                  </li>
                )}
                {cropDetails.soil_moisture_percent && (
                  <li>
                    <Droplet className="inline mr-2 text-cyan-500" />{" "}
                    {cropDetails.soil_moisture_percent.join(" – ")} %
                  </li>
                )}
                {cropDetails.ph && (
                  <li>
                    <FlaskConical className="inline mr-2 text-purple-500" /> pH:{" "}
                    {cropDetails.ph.join(" – ")}
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Cultivation Steps */}
          <div className="bg-white border border-green-200 rounded-xl p-5 shadow-lg space-y-4">
            <h3 className="text-xl font-semibold text-green-700 flex items-center gap-2">
              <Leaf className="w-6 h-6 text-green-600" /> Cultivation Steps
            </h3>
            {[
              ["season", "Season"],
              ["soil", "Soil"],
              ["sowing_window", "Sowing Window"],
              ["irrigation_schedule", "Irrigation"],
              ["weed_control", "Weed Control"],
              ["pest_disease_management", "Pest & Disease"],
              ["harvest_and_postharvest", "Harvest & Post-Harvest"],
            ].map(([field, label]) =>
              cropDetails[field] ? (
                <p
                  key={field}
                  className="border-b pb-2 last:border-none text-gray-700"
                >
                  <strong className="text-green-700">{label}:</strong>{" "}
                  {cropDetails[field]}
                </p>
              ) : null
            )}
          </div>

          {/* Fixed Timeline */}
          {cropDetails.timeline_months && (
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl shadow-lg">
              <h3 className="font-semibold text-green-700 mb-4">📅 Timeline</h3>
              <div className="flex items-center gap-6 overflow-x-auto">
                {Object.entries(cropDetails.timeline_months).map(
                  ([month, activity], idx) => (
                    <div
                      key={month}
                      className="flex flex-col items-center text-center min-w-[120px]"
                    >
                      <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold shadow-md">
                        {idx + 1}
                      </div>
                      <p className="mt-2 text-sm font-semibold text-green-800">
                        {month}
                      </p>
                      <p className="text-xs text-gray-600">{activity}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Cultivation Guide */}
          {(cropDetails.detailed_steps_en?.length > 0 ||
            cropDetails.detailed_steps_hi?.length > 0) && (
            <div className="bg-white border border-green-200 rounded-xl p-5 shadow-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                📖 Cultivation Guide
              </h3>
              {cropDetails.detailed_steps_en?.length > 0 && (
                <>
                  <h4 className="font-semibold text-green-600 mb-2">English</h4>
                  <ol className="list-decimal ml-6 space-y-1 text-gray-700">
                    {cropDetails.detailed_steps_en.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </>
              )}
              {cropDetails.detailed_steps_hi?.length > 0 && (
                <>
                  <h4 className="font-semibold text-green-600 mt-4 mb-2">
                    हिंदी
                  </h4>
                  <ol className="list-decimal ml-6 space-y-1 text-gray-700">
                    {cropDetails.detailed_steps_hi.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}




// import Navbar from "../components/Navbar";
// import { Sprout, Rocket, Users } from "lucide-react";

// export default function CropPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
//       <Navbar />

//       <main className="flex flex-col items-center justify-center text-center px-6 py-20">
//         {/* Icon */}
//         <div className="bg-green-600 text-white p-5 rounded-full shadow-lg mb-6">
//           <Sprout className="w-12 h-12" />
//         </div>

//         {/* Heading */}
//         <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-4">
//           🚧 Working on It!
//         </h1>

//         <p className="text-lg text-gray-700 max-w-xl mb-8">
//           Our crop intelligence system is growing 🌱  
//           Smart recommendations and cultivation insights are coming soon.
//         </p>

//         {/* Team Card */}
//         <div className="bg-white rounded-2xl shadow-xl border border-green-200 p-8 max-w-lg w-full">
//           <div className="flex items-center justify-center gap-2 mb-4">
//             <Users className="w-6 h-6 text-green-600" />
//             <h2 className="text-2xl font-bold text-green-700">
//               Team Aloo Intelligence 🥔
//             </h2>
//           </div>

//           <p className="text-gray-700 mb-4">
//             Powered by passion, data, and innovation.
//           </p>

//           <div className="bg-green-50 border border-green-200 rounded-xl p-4">
//             <p className="text-green-800 font-semibold text-lg">
//               🔥 All 3 Aloo will rock the field!
//             </p>
//             <p className="text-sm text-green-700 mt-1">
//               Stay tuned — something amazing is cooking 🚀
//             </p>
//           </div>
//         </div>

//         {/* Footer Note */}
//         <div className="mt-10 flex items-center gap-2 text-green-700 font-medium">
//           <Rocket className="w-5 h-5" />
//           Launching Soon
//         </div>
//       </main>
//     </div>
//   );
// }
