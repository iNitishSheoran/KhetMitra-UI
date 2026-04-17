import { useEffect, useState } from "react";

const API_KEY = "efcd381b82e9238378f622303354a388";
const CITY = "Delhi";

export default function useWeather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
        );
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return { data, loading };
}
