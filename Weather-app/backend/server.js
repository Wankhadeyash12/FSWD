const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/weather/:city', async (req, res) => {
  try {
    const { city } = req.params;
    
    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    const weatherData = {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: response.data.main.temp,
      feelsLike: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      description: response.data.weather[0].description,
      main: response.data.weather[0].main,
      windSpeed: response.data.wind.speed,
      cloudiness: response.data.clouds.all,
      icon: response.data.weather[0].icon,
      sunrise: new Date(response.data.sys.sunrise * 1000),
      sunset: new Date(response.data.sys.sunset * 1000),
    };

    res.json(weatherData);
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else {
      res.status(500).json({ error: 'Error fetching weather data' });
    }
  }
});

app.get('/api/weather/forecast/:city', async (req, res) => {
  try {
    const { city } = req.params;

    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );

    const forecastData = response.data.list.slice(0, 8).map(item => ({
      time: new Date(item.dt * 1000),
      temperature: item.main.temp,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      windSpeed: item.wind.speed,
      humidity: item.main.humidity,
    }));

    res.json({ city: response.data.city.name, forecast: forecastData });
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else {
      res.status(500).json({ error: 'Error fetching forecast data' });
    }
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Weather API server running on http://localhost:${PORT}`);
});
