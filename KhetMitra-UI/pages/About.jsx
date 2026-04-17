import React from "react";
import { Typewriter } from "react-simple-typewriter";
import Navbar from "../components/Navbar";
import farmerImg from "../assets/About.png";
import { Link } from "react-router-dom"; // ✅ import Link

function About() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-green-900">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="pt-[64px] flex items-center justify-center px-8 py-8 min-h-screen">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-6">
              हमारे बारे में -{" "}
              <span className="text-yellow-700 drop-shadow-sm">KhetMitra</span> 🌾
            </h1>

            <div className="text-2xl md:text-3xl font-bold text-green-900 leading-relaxed mb-6 h-16">
              <Typewriter
                words={[
                  "🌱 खेती को विज्ञान से जोड़ें",
                  "🚜 हर किसान की मदद में आगे बढ़ें",
                  "🌍 मिट्टी बताए सेहत का हाल",
                  "🌡️ NPK, नमी और तापमान का कमाल",
                  "⛈️ मौसम की खबर रहे आपके पास",
                  "💚 KhetMitra बने खेती का विश्वास",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={50}
                deleteSpeed={30}
                delaySpeed={2000}
              />
            </div>

            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
              <span className="font-semibold">KhetMitra</span> किसानों का डिजिटल
              साथी है। यहाँ आपको मिलती है मिट्टी की जाँच, स्मार्ट फसल सलाह,
              रोग पहचान और मौसम अलर्ट — ताकि आपकी मेहनत का हर दाना सोना बने। 🌾
            </p>

            {/* ✅ Button replaced with Link */}
            <Link
              to="/signup"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition transform hover:scale-105"
            >
              खेतमित्र से जुड़ें 🚜
            </Link>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src={farmerImg}
              alt="Farmer Illustration"
              className="w-full max-w-md rounded-2xl shadow-2xl border-4 border-green-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
