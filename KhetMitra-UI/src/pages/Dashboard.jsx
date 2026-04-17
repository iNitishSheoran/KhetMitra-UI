import React from "react";
import WeatherCard from "../components/WeatherCard";
import FarmSizeCard from "../components/FarmSizeCard";
import useWeatherByLocation from "../hooks/useWeatherByLocation";

export default function Dashboard() {
  const { data: weather } = useWeatherByLocation();
  const farmSize = 5.2;

  return (
    <div style={{ padding: 28 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>
        AI kheti, desh ki pragati
      </h1>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <WeatherCard weather={weather} />
        <FarmSizeCard size={farmSize} cropDefault="wheat" />
      </div>
    </div>
  );
}
