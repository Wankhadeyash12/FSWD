# Weather App

A full-stack weather application built with React and Node.js. Get real-time weather data and 5-day forecasts for any city using the OpenWeather API.

## Features

- 🌍 Real-time weather data for any city worldwide
- 📊 Current weather conditions (temperature, humidity, wind speed, pressure)
- 📅 5-day weather forecast with hourly data
- 🎨 Beautiful and responsive UI with gradient backgrounds
- 🔄 CORS-enabled API for frontend-backend communication
- 📱 Mobile-friendly design

## Project Structure

```
Weather-app/
├── backend/                 # Node.js Express server
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment variables (API keys)
│
└── frontend/               # React application
    ├── src/
    │   ├── components/     # React components
    │   │   ├── WeatherCard.js
    │   │   ├── Forecast.js
    │   │   └── SearchBar.js
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── public/
    │   └── index.html
    └── package.json        # Frontend dependencies
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeather API key (free at https://openweathermap.org/api)

## Setup Instructions

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file with your API key
# Edit .env and add your OpenWeather API key:
# OPENWEATHER_API_KEY=your_api_key_here

# Start the server
npm run dev    # For development with auto-reload (requires nodemon)
npm start      # For production
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will automatically open in your browser at `http://localhost:3000`

## API Endpoints

### Get Current Weather
```
GET /api/weather/:city
```
Returns current weather data for the specified city.

Example: `http://localhost:5000/api/weather/London`

### Get Weather Forecast
```
GET /api/weather/forecast/:city
```
Returns 5-day forecast data for the specified city.

Example: `http://localhost:5000/api/weather/forecast/London`

### Health Check
```
GET /health
```
Returns server status.

## Environment Variables

### Backend (.env)
```
PORT=5000
OPENWEATHER_API_KEY=your_api_key_here
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## Getting an OpenWeather API Key

1. Visit https://openweathermap.org/api
2. Sign up for a free account
3. Generate an API key from your account dashboard
4. Add the key to backend/.env

## Technologies Used

### Backend
- **Express.js** - Web framework for Node.js
- **Axios** - HTTP client for API requests
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management
- **Nodemon** - Auto-reload development server

### Frontend
- **React 18** - UI library
- **Axios** - HTTP client for API requests
- **CSS3** - Styling with Flexbox and Grid

## Response Format

### Current Weather Response
```json
{
  "city": "London",
  "country": "GB",
  "temperature": 15.5,
  "feelsLike": 14.2,
  "humidity": 72,
  "pressure": 1013,
  "description": "partly cloudy",
  "main": "Clouds",
  "windSpeed": 4.5,
  "cloudiness": 75,
  "icon": "02d",
  "sunrise": "2024-04-12T05:30:00.000Z",
  "sunset": "2024-04-12T18:45:00.000Z"
}
```

## Troubleshooting

### CORS Error
Make sure both servers are running:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

### API Key Error
- Ensure your OpenWeather API key is correct in `.env`
- Wait a few minutes after creating API key for it to activate

### City Not Found
- Check the spelling of the city name
- Try using the full city name with country code (e.g., "London, UK")

## Future Enhancements

- 🗺️ Map integration
- 📍 Geolocation support
- ⭐ Save favorite cities
- 📊 Advanced weather charts
- 🌙 Dark/Light theme toggle
- 🔔 Weather alerts/notifications
- 📱 Progressive Web App (PWA)
- 🌍 Multiple language support

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

Created as a full-stack weather application project.
