
import Navbar from "../components/Navbar";
import { Sprout, Rocket, Users } from "lucide-react";

export default function CropPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Navbar />

      <main className="flex flex-col items-center justify-center text-center px-6 py-20">
        {/* Icon */}
        <div className="bg-green-600 text-white p-5 rounded-full shadow-lg mb-6">
          <Sprout className="w-12 h-12" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-4">
          🚧 Working on It!
        </h1>

        <p className="text-lg text-gray-700 max-w-xl mb-8">
          Our crop intelligence system is growing 🌱  
          Smart recommendations and cultivation insights are coming soon.
        </p>

        {/* Team Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-green-200 p-8 max-w-lg w-full">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-green-700">
              Team Aloo Intelligence 🥔
            </h2>
          </div>

          <p className="text-gray-700 mb-4">
            Powered by passion, data, and innovation.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-green-800 font-semibold text-lg">
              🔥 All 3 Aloo will rock the field!
            </p>
            <p className="text-sm text-green-700 mt-1">
              Stay tuned — something amazing is cooking 🚀
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-10 flex items-center gap-2 text-green-700 font-medium">
          <Rocket className="w-5 h-5" />
          Launching Soon
        </div>
      </main>
    </div>
  );
}
