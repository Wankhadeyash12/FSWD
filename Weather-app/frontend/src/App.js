import React, { useState, useCallback } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('London');

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchWeather = useCallback(async (cityName) => {
    try {
      setLoading(true);
      setError('');
      setWeatherData(null);
      setForecastData(null);

      const weatherResponse = await axios.get(
        `${API_URL}/api/weather/${cityName}`
      );
      const forecastResponse = await axios.get(
        `${API_URL}/api/weather/forecast/${cityName}`
      );

      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
      setCity(cityName);
    } catch (err) {
      setError(
        err.response?.data?.error || 'Failed to fetch weather data. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const handleSearch = (cityName) => {
    if (cityName.trim()) {
      fetchWeather(cityName.trim());
    }
  };

  React.useEffect(() => {
    fetchWeather(city);
  }, [fetchWeather, city]);

  return (
    <div className="app">
      <div className="container">
        <h1 className="header">Weather App</h1>
        <SearchBar onSearch={handleSearch} />

        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading">Loading weather data...</div>}

        {weatherData && <WeatherCard data={weatherData} />}
        {forecastData && <Forecast data={forecastData} />}

        {!loading && !weatherData && !error && (
          <div className="placeholder">Search for a city to see weather data</div>
        )}
      </div>
    </div>
  );
}

export default App;
