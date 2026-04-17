import useWeatherByLocation from "../hooks/useWeatherByLocation";

export default function WeatherCard() {
  const { data, place, loading } = useWeatherByLocation();

  if (loading) return <div>Detecting exact location...</div>;
  if (!data) return <div>No weather data</div>;

  return (
    <div style={{ padding: 20, background: "#fff", borderRadius: 12 }}>
      <h3>{place}</h3>
      <h1>{Math.round(data.temp)}°C</h1>
      <p className="capitalize">{data.weather[0].description}</p>
      <p>Feels like: {Math.round(data.feels_like)}°C</p>
    </div>
  );
}
