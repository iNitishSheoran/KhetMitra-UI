import React from "react";
import M1 from "../assets/M1.png";
import M2 from "../assets/M2.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Marketing() {
  return (
    <div className="bg-gradient-to-b from-green-100 via-white to-green-50 py-16 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-green-800">
          🌾 KhetMitra सेवाएँ
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mt-3">
         <span className="text-red-500">AI</span> से स्मार्ट खेती – बेहतर फसल, ज़्यादा मुनाफा 🚜
        </p>
      </div>

      {/* पहला सेक्शन */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* बायीं तरफ़ इमेज */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <img
            src={M1}
            alt="एआई फसल निदान"
            className="rounded-2xl shadow-2xl border-4 border-green-200 group-hover:scale-105 transform transition duration-500"
          />
          <div className="absolute bottom-4 left-4 bg-green-700/80 text-white px-4 py-2 rounded-xl text-sm shadow-lg">
            📸 कुछ ही सेकंड में फसल की पहचान
          </div>
        </motion.div>

        {/* दायीं तरफ़ टेक्स्ट */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            मोबाइल से फसल की देखभाल 🌱
          </h3>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            बस अपनी फसल की तस्वीर खींचें 📷 → तुरंत एआई से निदान पाएं 🔍 → 
            दवा और इलाज की सही सलाह मिले 💊।  
            खेतमित्र से खेती होगी आसान और नुकसान होगा कम।
          </p>
          <Link to="https://huggingface.co/spaces/sangal-aarushi/CropDiseaseDetection">
          {/* <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition">
            अभी आज़माएँ 🚀
          </button> */}
          </Link>
        </motion.div>
      </div>

      {/* दूसरा सेक्शन */}
      <div className="grid md:grid-cols-2 gap-12 items-center mt-20">
        {/* बायीं तरफ़ टेक्स्ट */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            अपनी फसल का सही दाम पाएँ 💰
          </h3>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            एआई से जुड़ी मंडी जानकारी के साथ अपनी फसल को बेचें सही भाव पर।  
            रीयल-टाइम अपडेट्स 📊, दाम का रुझान 📈 और अलर्ट से कमाई होगी ज़्यादा।
          </p>
          <Link to="/daam">
  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition">
    मंडी भाव देखें 📊
  </button>
</Link>
        </motion.div>

        {/* दायीं तरफ़ इमेज */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <img
            src={M2}
            alt="मार्केट प्राइस जानकारी"
            className="rounded-2xl shadow-2xl border-4 border-yellow-200 group-hover:scale-105 transform transition duration-500"
          />
          <div className="absolute bottom-4 right-4 bg-yellow-600/90 text-white px-4 py-2 rounded-xl text-sm shadow-lg">
            📈 एआई मंडी सलाहकार
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Marketing;
