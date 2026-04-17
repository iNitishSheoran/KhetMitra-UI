import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tractor, Sprout } from "lucide-react";

export default function FarmSizeCard() {
  const navigate = useNavigate();

  const [landValue, setLandValue] = useState("");
  const [unit, setUnit] = useState("acre");
  const [crop, setCrop] = useState("");

  const isAcre = unit === "acre";

  const convertedValue =
    landValue && !isNaN(landValue)
      ? isAcre
        ? (landValue * 0.404686).toFixed(2)
        : (landValue / 0.404686).toFixed(2)
      : "";

  const handleCalculate = () => {
    if (!landValue || landValue <= 0 || !crop) return;

    const acres = isAcre
      ? Number(landValue)
      : Number((landValue / 0.404686).toFixed(2));

    navigate(`/farm-detail?size=${acres}&crop=${crop}`);
  };

  return (
    <div className="bg-gradient-to-br from-green-100 to-green-50 shadow-lg rounded-2xl p-6 w-[300px] border border-green-200 flex flex-col items-center text-center">
      <div className="flex items-center gap-2 mb-4">
        <Sprout className="text-green-700 w-6 h-6" />
        <h2 className="text-lg font-bold text-green-800">
          Farm Assistant 🌾
        </h2>
      </div>

      <input
        type="number"
        value={landValue}
        onChange={(e) => setLandValue(e.target.value)}
        placeholder={`Enter land in ${isAcre ? "acres" : "hectares"}`}
        className="border border-green-300 rounded-lg px-4 py-2 w-full text-center mb-2"
      />

      <div className="flex justify-between w-full text-sm text-gray-600 mb-2">
        <span>Acres</span>
        <button
          onClick={() => setUnit(isAcre ? "hectare" : "acre")}
          className="text-green-700 font-semibold"
        >
          Convert
        </button>
        <span>Hectares</span>
      </div>

      {convertedValue && (
        <p className="text-xs text-gray-500 mb-3">
          {landValue} {unit}s = {convertedValue}{" "}
          {isAcre ? "hectares" : "acres"}
        </p>
      )}

      {/* ✅ UPDATED CROP LIST */}
      <select
        value={crop}
        onChange={(e) => setCrop(e.target.value)}
        className="border border-green-300 rounded-lg px-4 py-2 w-full text-center mb-4"
      >
        <option value="">Select Crop</option>
        <option value="wheat">Wheat</option>
        <option value="rice">Rice</option>
        <option value="maize">Maize</option>
        <option value="barley">Barley</option>
        <option value="pulses">Pulses</option>
        <option value="mustard">Mustard</option>
        <option value="groundnut">Groundnut</option>
        <option value="soybean">Soybean</option>
        <option value="potato">Potato</option>
        <option value="onion">Onion</option>
        <option value="sugarcane">Sugarcane</option>
        <option value="cotton">Cotton</option>
      </select>

      <button
        onClick={handleCalculate}
        disabled={!landValue || !crop}
        className="flex items-center justify-center gap-2 bg-green-600 disabled:bg-gray-400 text-white px-5 py-2 rounded-lg font-semibold w-full"
      >
        <Tractor size={18} /> Calculate
      </button>
    </div>
  );
}
