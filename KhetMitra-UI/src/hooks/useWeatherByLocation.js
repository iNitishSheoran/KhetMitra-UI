import { useEffect, useState } from "react";

const WEATHER_API_KEY = "efcd381b82e9238378f622303354a388"; // OpenWeather key

export default function useWeatherByLocation() {
  const [data, setData] = useState(null);
  const [place, setPlace] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("📍 Requesting location permission...");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log("✅ Coordinates:", latitude, longitude);

        try {
          // 🔹 1. Fetch weather from OpenWeather
          const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
          );
          const weatherJson = await weatherRes.json();
          setData(weatherJson);

          // 🔹 2. Reverse geocode coordinates using OpenStreetMap
          const placeRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const placeJson = await placeRes.json();
          if (placeJson && placeJson.display_name) {
            setPlace(placeJson.display_name); // Exact human-readable location
          } else {
            setPlace("Unknown Location");
          }
        } catch (err) {
          console.error("❌ Error fetching weather or location:", err);
          setPlace("Unknown Location");
          setData(null);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("❌ Location error:", err);
        setPlace("Permission Denied");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return { data, place, loading };
}
