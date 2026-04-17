// India average crop yield ≈ 1.5–2.2 tons / acre = we're using 1.8 tons/acre
// Fertilizer usage ≈ 50–70 kg / acre = we're using 60 kg/acre
// Pesticide usage ≈ 0.2–0.5 litres / acre = we're using 0.35 litres/acre
// Avg pesticide usage = 0.2 – 0.5 litres / acre / season
// 2️⃣ Post-Harvest Loss → 0.65 tons
// ICAR India Average Loss: Harvest handling	5–8% ; Storage	6–10% ; Transport	4–6% =>>>>> 👉 Total Avg Loss = ~18%
// Cold Storage Needed → 60% of marketable produce
// Warehouse Storage → 40% of marketable produce
// Saved via Route Optimization → 3% of marketable produce
// Packhouse Benefit → If loss > 15%, recommend packhouse which can save additional 10% of total yield
// Agri Infra Fund Eligibility → If cold storage needed > 5 tons, eligible for subsidy


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import {
  Leaf,
  Sprout,
  FlaskRound,
  Bug,
  ArrowLeft,
  Info,
  Warehouse,
  Snowflake,
  Truck,
  PackageCheck,
  AlertTriangle,
} from "lucide-react";

const NAVBAR_HEIGHT = 72; // 👈 IMPORTANT (match Navbar height)

const cropConfig = {
  wheat:     { yield: 1.8, fertilizer: 60,  pesticide: 0.35 },
  rice:      { yield: 2.2, fertilizer: 75,  pesticide: 0.45 },
  maize:     { yield: 2.0, fertilizer: 65,  pesticide: 0.40 },
  barley:    { yield: 1.6, fertilizer: 55,  pesticide: 0.30 },
  pulses:    { yield: 1.2, fertilizer: 40,  pesticide: 0.25 },
  mustard:   { yield: 1.4, fertilizer: 50,  pesticide: 0.30 },
  groundnut: { yield: 1.8, fertilizer: 70,  pesticide: 0.45 },
  soybean:   { yield: 1.6, fertilizer: 65,  pesticide: 0.40 },
  potato:    { yield: 9.0, fertilizer: 120, pesticide: 0.60 },
  onion:     { yield: 7.5, fertilizer: 110, pesticide: 0.55 },
  sugarcane: { yield: 35,  fertilizer: 180, pesticide: 0.60 },
  cotton:    { yield: 1.2, fertilizer: 50,  pesticide: 0.30 },
};

export default function FarmDetail() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);

  const size = parseFloat(query.get("size")) || 0;
  const crop = query.get("crop") || "wheat";
  const config = cropConfig[crop];

  const estimatedYield = size * config.yield;
  const fertilizer = size * config.fertilizer;
  const pesticide = size * config.pesticide;

  const spoilageLoss = estimatedYield * 0.18;
  const marketable = estimatedYield - spoilageLoss;

  const coldStorage = marketable * 0.6;
  const warehouse = marketable * 0.4;
  const savedRouting = marketable * 0.03;

  const packhouseSaved = estimatedYield * 0.1;
  const agriInfraFundEligible = coldStorage > 5;

  const hectares = size * 0.404686;

  return (
    <>
      <Navbar />

      {/* 🔙 Back to Home (below navbar, fixed) */}
      <button
        onClick={() => navigate("/")}
        style={{ top: NAVBAR_HEIGHT + 12 }}
        className="fixed left-6 z-50 flex items-center gap-2
                   bg-white px-3 py-1.5 rounded-full shadow
                   text-green-700 font-semibold hover:bg-green-100"
      >
        <ArrowLeft size={18} /> Home
      </button>

      {/* MAIN CONTENT */}
      <div
        className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-6 pb-12"
        style={{ paddingTop: NAVBAR_HEIGHT + 32 }} // 👈 KEY FIX
      >
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-bold text-green-800">
            🌾 Smart Farm Report
          </h1>
          <p className="text-gray-600 capitalize">
            Crop: <b>{crop}</b>
          </p>
        </motion.div>

        {/* LAND CONVERSION */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 shadow mb-8 text-center">
          <p className="text-sm text-gray-500">Land Area Conversion</p>
          <p className="text-lg font-semibold">
            {size} acres = {hectares.toFixed(2)} hectares
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Stat icon={<Leaf />} label="Farm Size" value={`${size} acres`} />
          <Stat icon={<Sprout />} label="Estimated Yield" value={`${estimatedYield.toFixed(2)} tons`} />
          <Stat icon={<FlaskRound />} label="Fertilizer" value={`${fertilizer.toFixed(1)} kg`} />
          <Stat icon={<Bug />} label="Pesticide" value={`${pesticide.toFixed(2)} litres`} />
          <Stat icon={<AlertTriangle />} label="Post-Harvest Loss" value={`${spoilageLoss.toFixed(2)} tons`} />
          <Stat icon={<Snowflake />} label="Cold Storage" value={`${coldStorage.toFixed(2)} tons`} />
          <Stat icon={<Warehouse />} label="Warehouse Storage" value={`${warehouse.toFixed(2)} tons`} />
          <Stat icon={<Truck />} label="Saved via Routing" value={`${savedRouting.toFixed(2)} tons`} />
          <Stat icon={<PackageCheck />} label="Packhouse Benefit" value={`${packhouseSaved.toFixed(2)} tons saved`} />
          <Stat icon={<Info />} label="Agri Infra Fund" value={agriInfraFundEligible ? "Eligible" : "Not Eligible"} />
        </div>
      </div>
    </>
  );
}

function Stat({ icon, label, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl p-5 shadow-lg text-center"
    >
      <div className="flex justify-center mb-2 text-green-600">
        {icon}
      </div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </motion.div>
  );
}
