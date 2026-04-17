import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Video, Camera, Heart, Sparkles } from "lucide-react";

export default function KMStudio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-200 to-green-300">
      <Navbar />

      <main className="flex flex-col items-center justify-center text-center px-6 py-24">
        {/* Animated Camera */}
        <motion.div
          className="bg-green-600 text-white p-6 rounded-full shadow-xl mb-6"
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Camera className="w-12 h-12" />
        </motion.div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4">
          🎬 KMStudio is in the Making!
        </h1>

        <p className="text-lg text-green-800 max-w-xl mb-8">
          Our Aloo is standing in front of the camera…  
          but getting a little shy 🙈🥔  
        </p>

        {/* Cute Card */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-green-200 p-8 max-w-lg w-full">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Video className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-green-800">
              Team Aloo Intelligence 💚
            </h2>
          </div>

          <p className="text-green-700 mb-4">
            We’re creating helpful, informative, and friendly videos  
            for farmers — straight from the heart 🌾
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
            <p className="font-semibold text-green-800">
              🎥 Aloo says:
            </p>
            <p className="text-sm text-green-700">
              “Please give me a little time…  
              I’m learning how to smile at the camera 😅”
            </p>
          </div>

          <div className="mt-4 bg-pink-50 border border-pink-200 rounded-xl p-4">
            <p className="font-semibold text-pink-800">
              ❤️ All 3 Aloo are trying their best!
            </p>
            <p className="text-sm text-pink-700">
              Once the shyness is gone, videos will roll non-stop 🚀
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 flex items-center gap-2 text-green-800 font-medium">
          <Sparkles className="w-5 h-5" />
          Lights. Camera. Aloo. 🥔✨
        </div>
      </main>
    </div>
  );
}