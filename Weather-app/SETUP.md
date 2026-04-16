# Weather App Setup Guide

This file contains quick start instructions for the Weather App project.

## Quick Start

### Prerequisites
- Node.js installed
- OpenWeather API key

### Step 1: Get API Key
1. Go to https://openweathermap.org/api
2. Sign up for free
3. Copy your API key

### Step 2: Configure Backend
```bash
cd backend
npm install
```

Edit `backend/.env`:
```
PORT=5000
OPENWEATHER_API_KEY=your_copied_api_key_here
NODE_ENV=development
```

Start backend:
```bash
npm run dev
```

### Step 3: Configure Frontend
```bash
cd frontend
npm install
```

Start frontend:
```bash
npm start
```

Visit `http://localhost:3000` in your browser!

## Useful Commands

### Backend
- `npm run dev` - Start with auto-reload
- `npm start` - Start production server
- `npm install nodemon --save-dev` - Install auto-reload (if needed)

### Frontend
- `npm start` - Development server
- `npm run build` - Production build

## Common Issues

| Issue | Solution |
|-------|----------|
| CORS errors | Ensure backend runs on port 5000 |
| City not found | Check spelling, use correct city name |
| API not working | Verify API key in .env file |
| Port already in use | Change PORT in backend/.env or kill process on that port |

## Features Included

✅ Real-time weather data  
✅ 5-day forecast  
✅ Responsive design  
✅ Beautiful UI  
✅ Error handling  
✅ Search functionality  

Enjoy your weather app! 🌤️
