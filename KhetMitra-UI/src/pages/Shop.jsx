
import Navbar from "../components/Navbar";
import { Hammer, Heart, Sparkles } from "lucide-react";

function Shop() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Navbar />

      <main className="flex flex-col items-center justify-center text-center px-6 py-24">
        {/* Icon */}
        <div className="bg-emerald-600 text-white p-6 rounded-full shadow-xl mb-6 animate-pulse">
          <Hammer className="w-12 h-12" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-800 mb-4">
          🛒 Shop Coming Soon
        </h1>

        <p className="text-lg text-gray-700 max-w-xl mb-8">
          Our Aloo is working very hard to set up the shop 🥔💪  
          Devices are getting polished, packed, and prepared with care.
        </p>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-emerald-200 p-8 max-w-md w-full">
          <p className="text-emerald-700 font-semibold mb-3">
            💚 From Team Aloo Intelligence
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p className="text-emerald-800 font-medium">
              “Please wait a little…
            </p>
            <p className="text-sm text-emerald-700">
              We want everything to be perfect before opening the shop ✨”
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-emerald-700 font-medium">
            <Heart className="w-5 h-5" />
            Built with care for farmers
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 flex items-center gap-2 text-emerald-800 font-medium">
          <Sparkles className="w-5 h-5" />
          Smart devices coming soon 🥔🚜
        </div>
      </main>
    </div>
  );
}

export default Shop;
