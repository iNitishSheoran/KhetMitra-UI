import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-gradient-to-b from-green-800 to-green-900 text-gray-100">
      {/* Tagline */}
      <div className="text-center py-6 bg-green-700">
        <h2 className="text-2xl md:text-3xl font-bold">
          🌾 गाँव की प्रगति, <span className="text-yellow-300">AI की शक्ति</span> 🌱
        </h2>
      </div>

      {/* Footer Content */}
      <footer className="max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-yellow-300">हमारे बारे में</h3>
          <p className="text-sm leading-relaxed text-gray-300">
            <span className="font-semibold">KhetMitra</span> किसानों का डिजिटल साथी 🚜।  
            यहाँ मिलती है मिट्टी की जाँच, स्मार्ट फसल सलाह,  
            रोग पहचान और मौसम की जानकारी 🌦️ — ताकि  
            मेहनत का हर दाना सोना बने 🌾।
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-yellow-300">खोजें</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/diagnose" className="hover:text-white">रोग पहचान</a></li>
            <li><a href="/cropData" className="hover:text-white">फसल डेटा</a></li>
            <li><a href="/about" className="hover:text-white">हमारे बारे में</a></li>
            <li><a href="/help" className="hover:text-white">मदद</a></li>
            <li><a href="/daam" className="hover:text-white">दाम (daam)</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-yellow-300">साधन</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#blogs" className="hover:text-white">खेती ब्लॉग</a></li>
            <li><a href="/cropData" className="hover:text-white">मार्गदर्शन</a></li>
            <li><a href="/help" className="hover:text-white">किसान सहायता</a></li>
            <li><a href="/cropData" className="hover:text-white">गोपनीयता नीति</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-yellow-300">जुड़े रहें</h3>
          <p className="text-sm mb-3 text-gray-300">
            खेती की नई तकनीक, मौसम अलर्ट और AI सलाह के लिए हमें फॉलो करें।
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><FaFacebook size={22} /></a>
            <a href="#" className="hover:text-white"><FaTwitter size={22} /></a>
            <a href="#" className="hover:text-white"><FaInstagram size={22} /></a>
            <a href="#" className="hover:text-white"><FaLinkedin size={22} /></a>
            <a href="#" className="hover:text-white"><FaWhatsapp size={22} /></a>
          </div>
        </div>
      </footer>

      {/* Bottom Note */}
      <div className="text-center text-xs text-gray-400 border-t border-gray-700 py-4">
        © {new Date().getFullYear()} KhetMitra | किसानों के साथ, हर कदम पर 🌱
      </div>
    </div>
  );
}

export default Footer;
