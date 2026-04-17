import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Banner1 from "../assets/Banner1.png";
import Banner2 from "../assets/Banner2.png";
import Banner3 from "../assets/Banner3.png";
import Banner4 from "../assets/Banner4.png";
import Animation from "../assets/Animation.mp4";
import Navbar from "../components/Navbar";
import Highlights from "../components/Highlights";
import About from "./About";
import Pros from "./Pros";
import Marketing from "./Marketing";
import Floating from "../components/Floating";
import Diagnose from "./Diagnose";
import Footer from "../components/Footer";
import WeatherWidget from "../components/WeatherWidget";
import FarmSizeCard from "../components/FarmSizeCard";
import useWeatherByLocation from "../hooks/useWeatherByLocation";

const banners = [Banner1, Banner2, Banner3, Banner4];

function Body() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [openFeedback, setOpenFeedback] = useState(false);
  // const [weatherData, setWeatherData] = useState(null);

  const { data: weatherData, place, loading } = useWeatherByLocation();

  // 🔁 Banner rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // // 🌤️ Fetch weather data
  // useEffect(() => {
  //   const fetchWeather = async () => {
  //     const apiKey = "efcd381b82e9238378f622303354a388"; // ✅ working key
  //     const city = "Delhi";
  //     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  //     try {
  //       const res = await fetch(url);
  //       const json = await res.json();
  //       setWeatherData(json);
  //     } catch (err) {
  //       console.error("Weather fetch error:", err);
  //     }
  //   };
  //   fetchWeather();
  // }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />

      {/* ✅ Banner */}
      <div className="w-full mt-[5.1rem] relative">
        <div className="relative w-full aspect-[19/6] sm:aspect-[19/5] md:aspect-[19/4] lg:aspect-[19/3]">
          <AnimatePresence mode="sync">
            <motion.img
              key={currentBanner}
              src={banners[currentBanner]}
              alt={`Banner ${currentBanner + 1}`}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* ✅ Tagline + Weather + Farm Box */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-[3rem] pb-[8rem] gap-12 bg-[#e3efe6] w-full">
          {/* Left section */}
          <div className="w-full lg:w-1/2 px-6 sm:px-10 lg:px-12 xl:pl-20">
            <h1 className="text-3xl mt-16 sm:text-4xl font-extrabold leading-snug text-[#14213d]">
              <span className="text-red-500">AI</span>{" "}
              <span className="text-green-800">kheti 🌾</span>,{" "}
              <span className="text-red-500">desh </span> ki pragati
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mt-4">
              मिट्टी से मंडी तक – हर कदम पर आपके साथ – खेतमित्र।
            </p>

            {/* ✅ Weather + Farm Summary */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-6">
              <FarmSizeCard />
              {loading ? (
                <p className="text-gray-500">📍 Detecting location...</p>
              ) : weatherData ? (
                <WeatherWidget weather={weatherData} place={place} />
              ) : (
                <p className="text-red-500">❌ Weather unavailable</p>
              )}
            </div>
          </div>

          {/* Right section (video) */}
          <div className="w-full lg:w-1/2 px-6 sm:px-10 lg:px-12 xl:pr-20">
            <video
              src={Animation}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* ✅ Other sections */}
        <Highlights className="bg-white" />
        <Diagnose />
        <Marketing />
        <Pros />
        <About />
        <Floating isOpen={openFeedback} onClose={() => setOpenFeedback(false)} />
        <Footer />
      </div>
    </div>
  );
}

export default Body;
