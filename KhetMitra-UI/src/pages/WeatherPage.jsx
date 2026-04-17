import React, { useEffect, useState } from "react";

const API_KEY = "efcd381b82e9238378f622303354a388";

export default function WeatherPage() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const json = await res.json();
      setWeather(json);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-10 text-center">Detecting location...</div>;

  return (
    <div className="p-8 max-w-xl mx-auto text-center bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold">{weather.name}</h1>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt=""
        className="mx-auto"
      />
      <p className="text-4xl font-bold">
        {Math.round(weather.main.temp)}°C
      </p>
      <p className="capitalize">{weather.weather[0].description}</p>
    </div>
  );
}
