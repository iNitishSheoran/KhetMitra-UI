import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Heart, TrendingUp, Smile, Sparkles } from "lucide-react";

export default function MandiPriceApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-green-200">
      <Navbar />

      <main className="flex flex-col items-center justify-center text-center px-6 py-24">
        {/* Animated Icon */}
        <motion.div
          className="bg-green-700 text-white p-6 rounded-full shadow-xl mb-6"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <TrendingUp className="w-12 h-12" />
        </motion.div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4">
          🥔 Aloo Is Checking the Prices…
        </h1>

        <p className="text-lg text-green-800 max-w-xl mb-8">
          Aloo wants to be 100% sure before showing mandi prices 📊  
          No wrong daam, only honest daam 🤝
        </p>

        {/* Cute Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-green-200 p-8 max-w-lg w-full">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Smile className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-green-800">
              Team Aloo Intelligence 🥔💚
            </h2>
          </div>

          <p className="text-green-700 mb-4">
            Our little Aloo is talking to mandis,  
            checking data twice, and polishing numbers ✨
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
            <p className="font-semibold text-green-800">
              📢 Aloo says:
            </p>
            <p className="text-sm text-green-700">
              “Please wait a bit…  
              I don’t want to show you the wrong price 😌”
            </p>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="font-semibold text-yellow-800">
              ❤️ All 3 Aloo are cross-checking together!
            </p>
            <p className="text-sm text-yellow-700">
              Accurate mandi prices coming very soon 🚜
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 flex items-center gap-2 text-green-800 font-medium">
          <Sparkles className="w-5 h-5" />
          Honest prices. Happy farmers. Aloo promise 🥔🤍
        </div>
      </main>
    </div>
  );
}
