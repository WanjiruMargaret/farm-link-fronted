# Weather Feature Documentation

## Overview
The Weather Feature provides farmers with current weather conditions, forecasts, and farming-specific recommendations to help make informed agricultural decisions.

## Components

### 1. WeatherWidget (`/src/components/WeatherWidget.jsx`)
- **Purpose**: Reusable weather display component
- **Features**:
  - Current temperature, condition, humidity, wind speed
  - 5-day weather forecast
  - Farming advice based on weather conditions
  - Location input (optional)
  - Refresh functionality
  - Offline fallback data

**Props**:
- `location` (string): Weather location (default: "Nairobi, Kenya")
- `showLocationInput` (boolean): Show location search input (default: false)

### 2. Weather Page (`/src/pages/Weather.jsx`)
- **Purpose**: Dedicated weather dashboard for farmers
- **Features**:
  - Location search and selection
  - Popular locations quick-select
  - Dynamic weather alerts
  - Farming recommendations
  - Extended forecast view
  - Weather highlights

### 3. Weather Service (`/src/services/weatherService.js`)
- **Purpose**: Farming-specific weather logic
- **Features**:
  - Generate weather alerts for farming
  - Provide crop-specific advice
  - Farming activity recommendations
  - Risk assessment based on weather conditions

## API Integration

### Backend Integration
The weather feature tries to fetch data from your backend first:
- `GET /api/weather?location={location}` - Current weather
- `GET /api/weather/forecast?location={location}&days={days}` - Forecast

### OpenWeatherMap Fallback
If backend is unavailable, it falls back to OpenWeatherMap API:
- Requires `VITE_WEATHER_API_KEY` in `.env`
- Direct API calls to OpenWeatherMap

## Setup Instructions

### 1. Environment Variables
Add to your `.env` file:
```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key_here
VITE_API_URL=http://localhost:3001/api
```

### 2. Get OpenWeatherMap API Key
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key
4. Add it to your `.env` file

### 3. Navigation
The weather page is accessible via:
- URL: `/weather`
- Navigation menu: "Weather" link

## Usage Examples

### Basic Weather Widget (Dashboard)
```jsx
import WeatherWidget from '../components/WeatherWidget';

// Simple widget
<WeatherWidget location="Nairobi, Kenya" />

// With location input
<WeatherWidget location="Nairobi, Kenya" showLocationInput={true} />
```

### Weather Service Usage
```javascript
import weatherService from '../services/weatherService';

// Get weather alerts
const alerts = weatherService.getWeatherAlerts(weatherData, location);

// Get farming recommendations
const recommendations = weatherService.getFarmingRecommendations(weatherData);

// Get crop-specific advice
const advice = weatherService.getCropAdvice(weatherData, 'maize');
```

## Features

### Weather Alerts
- **Extreme Heat**: Temperature > 35°C
- **Frost Warning**: Temperature < 5°C
- **Storm Alert**: Thunderstorms detected
- **High Humidity**: Humidity > 85%

### Farming Recommendations
- **Planting**: Optimal conditions detection
- **Irrigation**: Water requirement alerts
- **Harvesting**: Best weather for harvesting
- **Pest Control**: Conditions favoring pests

### Crop-Specific Advice
Supports advice for:
- Maize
- Tomatoes
- Beans
- Potatoes
- General crops

## Offline Support
- Fallback weather data when API is unavailable
- Cached recommendations
- Offline indicator in widget
- Graceful error handling

## Customization

### Adding New Crops
Edit `/src/services/weatherService.js`:
```javascript
getCropAdvice(weather, cropType) {
  const advice = {
    maize: this.getMaizeAdvice(weather),
    tomatoes: this.getTomatoAdvice(weather),
    // Add your crop here
    newCrop: this.getNewCropAdvice(weather)
  };
  return advice[cropType] || this.getGeneralAdvice(weather);
}
```

### Custom Weather Alerts
Add new alert conditions in `getWeatherAlerts()` method:
```javascript
if (customCondition) {
  alerts.push({
    type: 'warning', // 'info', 'warning', 'danger'
    title: 'Custom Alert',
    message: 'Your custom message',
    priority: 'medium' // 'low', 'medium', 'high'
  });
}
```

## Styling
Uses Tailwind CSS classes. Key color schemes:
- Green: Primary farming theme
- Blue: Weather information
- Orange: Warnings
- Red: Danger alerts
- Yellow: Recommendations

## Future Enhancements
- Weather maps integration
- Historical weather data
- Seasonal farming calendar
- Weather-based crop recommendations
- Push notifications for weather alerts
- Integration with IoT sensors