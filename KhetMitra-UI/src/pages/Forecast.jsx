import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Forecast() {
  const navigate = useNavigate();
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = "efcd381b82e9238378f622303354a388";
  const city = "Delhi";

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();

        const dailyData = {};
        data.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!dailyData[date]) dailyData[date] = [];
          dailyData[date].push(item);
        });

        const dailyAvg = Object.entries(dailyData).map(([date, values]) => {
          const temps = values.map((v) => v.main.temp);
          const hums = values.map((v) => v.main.humidity);
          const winds = values.map((v) => v.wind.speed);
          const rains = values.map((v) => (v.rain ? v.rain["3h"] || 0 : 0));
          const avg = (arr) =>
            Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
          const mainWeather = values[0].weather[0];

          return {
            date,
            avgTemp: avg(temps),
            avgHumidity: avg(hums),
            avgWind: avg(winds),
            avgRain: avg(rains),
            icon: mainWeather.icon,
            description: mainWeather.description,
          };
        });

        setForecast(dailyAvg.slice(0, 7));
      } catch (err) {
        console.error("Forecast error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-green-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-green-700 hover:underline font-semibold flex items-center gap-2"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-green-800 text-center w-full">
            🌤 7 Days Weather Forecast ({city})
          </h1>
          <div className="w-16"></div>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-center text-gray-500 text-lg font-medium">
            Loading forecast...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-5 border border-green-100 hover:shadow-xl transition duration-300 hover:-translate-y-1 flex flex-col items-center"
              >
                {/* Date */}
                <h2 className="font-semibold text-gray-800 text-md mb-1">
                  {new Date(day.date).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </h2>

                {/* Icon */}
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                  className="w-14 h-14 mb-2"
                />

                {/* Temp */}
                <p className="text-2xl font-bold text-green-700">
                  {day.avgTemp}°C
                </p>

                {/* Desc */}
                <p className="capitalize text-gray-600 text-sm mb-3">
                  {day.description}
                </p>

                {/* Details */}
                <div className="text-sm text-gray-700 space-y-1">
                  <p>💧 {day.avgHumidity}%</p>
                  <p>💨 {day.avgWind} m/s</p>
                  <p>🌧 {day.avgRain} mm</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
