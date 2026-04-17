import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

// ✅ Fixed all URLs to embed format
const videos = [
  {
    id: 1,
    ytId: "qDMPGPrLnq4",
    url: "https://www.youtube.com/embed/qDMPGPrLnq4",
    title: "AI se Kisanon ki Madad",
    desc: "KhetMitra se kisanon ko market price aur farming tips ki sahaj jankari.",
  },
  {
    id: 2,
    ytId: "kx4gDTT_yPw",
    url: "https://www.youtube.com/embed/kx4gDTT_yPw",
    title: "Beej se Bechne tak",
    desc: "AI ke sath kheti ka safar: Beej se lekar mandi tak ka safar ab aasaan.",
  },
  {
    id: 3,
    ytId: "vluu0-yT3wQ",
    url: "https://www.youtube.com/embed/vluu0-yT3wQ",
    title: "Mandi Price Update",
    desc: "Real-time mandi ke daam, ab KhetMitra se har kisan ke phone par.",
  },
  {
    id: 4,
    ytId: "Sgmjw17V9Z8",
    url: "https://www.youtube.com/embed/Sgmjw17V9Z8",
    title: "Smart Farming",
    desc: "AI se kheti aur bhi smart – samay aur fasal dono ki bachat.",
  },
  {
    id: 5,
    ytId: "oYhNpWmEeCw",
    url: "https://www.youtube.com/embed/oYhNpWmEeCw",
    title: "Shorts 1",
    desc: "AI powered farming innovations – Shorts version.",
  },
  {
    id: 6,
    ytId: "4fIzgc89rnM",
    url: "https://www.youtube.com/embed/4fIzgc89rnM",
    title: "Shorts 2",
    desc: "Mandi prices & insights in 60 seconds.",
  },
  {
    id: 7,
    ytId: "B9G57zv2z6Y",
    url: "https://www.youtube.com/embed/B9G57zv2z6Y",
    title: "Shorts 3",
    desc: "Quick tips for smart farming.",
  },
  {
    id: 8,
    ytId: "cE7DrrzFz_Q",
    url: "https://www.youtube.com/embed/cE7DrrzFz_Q",
    title: "Shorts 4",
    desc: "AI + Kisan = Future farming revolution.",
  },
];

export default function KMStudio() {
  const [openVideo, setOpenVideo] = useState(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-100 via-emerald-200 to-green-300 overflow-hidden">
      <Navbar />

      <div className="pt-28 px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-green-900 text-center mb-12 drop-shadow-lg">
          🌾 KhetMitra – AI se Kisanon ki Shakti 🌱
        </h1>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto relative z-10">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              className="relative bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden group cursor-pointer border border-green-200"
              whileHover={{ scale: 1.07 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={() => setOpenVideo(video)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.ytId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <motion.div
                    className="p-6 rounded-full bg-white/30 backdrop-blur-md border border-white shadow-lg"
                    whileHover={{ scale: 1.2 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-14 w-14 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                </div>

                <span className="absolute bottom-3 right-3 text-xs bg-green-800 text-white px-3 py-1 rounded-full shadow-md">
                  Tap to Play
                </span>
              </div>

              <div className="p-5">
                <h2 className="text-2xl font-bold text-green-900 drop-shadow-sm">
                  {video.title}
                </h2>
                <p className="text-green-700 mt-2">{video.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {openVideo && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <div className="relative">
              <iframe
                src={`${openVideo.url}?autoplay=1`}
                title={openVideo.title}
                className="w-full h-[420px] md:h-[540px]"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => setOpenVideo(null)}
                className="absolute top-3 right-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 shadow-lg"
              >
                ✖ Close
              </button>
            </div>

            <div className="p-5">
              <h2 className="text-2xl font-bold text-green-900">
                {openVideo.title}
              </h2>
              <p className="text-green-700 mt-2">{openVideo.desc}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}






// import Navbar from "../components/Navbar";
// import { motion } from "framer-motion";
// import { Video, Camera, Heart, Sparkles } from "lucide-react";

// export default function KMStudio() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-200 to-green-300">
//       <Navbar />

//       <main className="flex flex-col items-center justify-center text-center px-6 py-24">
//         {/* Animated Camera */}
//         <motion.div
//           className="bg-green-600 text-white p-6 rounded-full shadow-xl mb-6"
//           animate={{ rotate: [0, -10, 10, -10, 0] }}
//           transition={{ repeat: Infinity, duration: 2 }}
//         >
//           <Camera className="w-12 h-12" />
//         </motion.div>

//         {/* Heading */}
//         <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-4">
//           🎬 KMStudio is in the Making!
//         </h1>

//         <p className="text-lg text-green-800 max-w-xl mb-8">
//           Our Aloo is standing in front of the camera…  
//           but getting a little shy 🙈🥔  
//         </p>

//         {/* Cute Card */}
//         <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-green-200 p-8 max-w-lg w-full">
//           <div className="flex items-center justify-center gap-2 mb-4">
//             <Video className="w-6 h-6 text-green-600" />
//             <h2 className="text-2xl font-bold text-green-800">
//               Team Aloo Intelligence 💚
//             </h2>
//           </div>

//           <p className="text-green-700 mb-4">
//             We’re creating helpful, informative, and friendly videos  
//             for farmers — straight from the heart 🌾
//           </p>

//           <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
//             <p className="font-semibold text-green-800">
//               🎥 Aloo says:
//             </p>
//             <p className="text-sm text-green-700">
//               “Please give me a little time…  
//               I’m learning how to smile at the camera 😅”
//             </p>
//           </div>

//           <div className="mt-4 bg-pink-50 border border-pink-200 rounded-xl p-4">
//             <p className="font-semibold text-pink-800">
//               ❤️ All 4 Aloo are trying their best!
//             </p>
//             <p className="text-sm text-pink-700">
//               Once the shyness is gone, videos will roll non-stop 🚀
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-10 flex items-center gap-2 text-green-800 font-medium">
//           <Sparkles className="w-5 h-5" />
//           Lights. Camera. Aloo. 🥔✨
//         </div>
//       </main>
//     </div>
//   );
// }
