import React from "react";

export default function DayCard({ day }) {
  const date = new Date(day.dt * 1000).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "12px",
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        flex: "1 0 120px",
      }}
    >
      <p style={{ fontWeight: "bold", marginBottom: "5px" }}>{date}</p>
      <img
        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
        alt="icon"
        style={{ width: "50px", height: "50px" }}
      />
      <p style={{ margin: "5px 0" }}>{Math.round(day.temp.day)}°C</p>
      <p style={{ textTransform: "capitalize", fontSize: "13px" }}>
        {day.weather[0].description}
      </p>
      <p style={{ fontSize: "12px", color: "#666" }}>💧 {day.humidity}%</p>
    </div>
  );
}
