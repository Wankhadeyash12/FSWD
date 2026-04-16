import React from 'react';
import './WeatherCard.css';

function WeatherCard({ data }) {
  const getWeatherIconUrl = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@4x.png`;
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2 className="city-name">
          {data.city}, {data.country}
        </h2>
        <p className="weather-description">{data.description}</p>
      </div>

      <div className="weather-content">
        <div className="weather-icon-section">
          <img
            src={getWeatherIconUrl(data.icon)}
            alt={data.main}
            className="weather-icon"
          />
        </div>

        <div className="temperature-section">
          <div className="temperature">{Math.round(data.temperature)}°C</div>
          <div className="feels-like">Feels like {Math.round(data.feelsLike)}°C</div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{data.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{data.pressure} hPa</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{data.windSpeed} m/s</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Cloudiness</span>
          <span className="detail-value">{data.cloudiness}%</span>
        </div>
      </div>

      <div className="sunrise-sunset">
        <div className="time-item">
          <span className="time-label">🌅 Sunrise</span>
          <span className="time-value">{formatTime(data.sunrise)}</span>
        </div>
        <div className="time-item">
          <span className="time-label">🌇 Sunset</span>
          <span className="time-value">{formatTime(data.sunset)}</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
