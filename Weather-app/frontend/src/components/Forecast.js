import React from 'react';
import './Forecast.css';

function Forecast({ data }) {
  const getWeatherIconUrl = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {data.forecast.map((item, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-time">
              <div className="time">{formatTime(item.time)}</div>
              <div className="date">{formatDate(item.time)}</div>
            </div>
            <img
              src={getWeatherIconUrl(item.icon)}
              alt={item.description}
              className="forecast-icon"
            />
            <div className="forecast-temp">
              {Math.round(item.temperature)}°C
            </div>
            <div className="forecast-description">{item.description}</div>
            <div className="forecast-details">
              <div className="detail">
                <span>💨</span>
                <span>{item.windSpeed} m/s</span>
              </div>
              <div className="detail">
                <span>💧</span>
                <span>{item.humidity}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
