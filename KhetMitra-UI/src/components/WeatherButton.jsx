import React from "react";
import { Link } from "react-router-dom";
import useWeatherByLocation from "../hooks/useWeatherByLocation";

export default function WeatherButton() {
  const { data, loading } = useWeatherByLocation();

  const temp = data?.main ? Math.round(data.main.temp) : "--";
  const desc = data?.weather?.[0]?.main || "";

  return (
    <Link
      to="/weather"
      style={{
        backgroundColor: "#2d6a4f",
        color: "#fff",
        padding: "10px 18px",
        borderRadius: "25px",
        textDecoration: "none",
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      📍 {loading ? "Detecting..." : `${temp}°C, ${desc}`}
    </Link>
  );
}
