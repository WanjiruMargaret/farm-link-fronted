// Weather service for farming-specific functionality
class WeatherService {
  // Get weather alerts for farming
  getWeatherAlerts(weather, location) {
    const alerts = [];
    
    if (!weather) return alerts;
    
    const temp = weather.temperature;
    const condition = weather.condition?.toLowerCase() || '';
    const humidity = weather.humidity;
    
    // Temperature alerts
    if (temp > 35) {
      alerts.push({
        type: 'danger',
        title: 'Extreme Heat Warning',
        message: 'Temperatures above 35°C can stress crops and livestock. Increase irrigation and provide shade.',
        priority: 'high'
      });
    } else if (temp < 5) {
      alerts.push({
        type: 'danger',
        title: 'Frost Warning',
        message: 'Risk of frost damage to crops. Cover sensitive plants and move livestock to shelter.',
        priority: 'high'
      });
    }
    
    // Weather condition alerts
    if (condition.includes('storm') || condition.includes('thunder')) {
      alerts.push({
        type: 'warning',
        title: 'Storm Alert',
        message: 'Thunderstorms expected. Secure equipment and shelter livestock.',
        priority: 'medium'
      });
    }
    
    if (condition.includes('rain') && humidity > 90) {
      alerts.push({
        type: 'info',
        title: 'Heavy Rain & High Humidity',
        message: 'Monitor crops for fungal diseases. Ensure proper drainage.',
        priority: 'medium'
      });
    }
    
    // Humidity alerts
    if (humidity > 85) {
      alerts.push({
        type: 'warning',
        title: 'High Humidity Alert',
        message: 'High humidity increases disease risk. Monitor crops closely.',
        priority: 'medium'
      });
    }
    
    return alerts;
  }
  
  // Get farming recommendations based on weather
  getFarmingRecommendations(weather, forecast = []) {
    const recommendations = [];
    
    if (!weather) return recommendations;
    
    const temp = weather.temperature;
    const condition = weather.condition?.toLowerCase() || '';
    const humidity = weather.humidity;
    
    // Planting recommendations
    if (temp >= 18 && temp <= 25 && humidity >= 50 && humidity <= 70) {
      recommendations.push({
        category: 'planting',
        title: 'Optimal Planting Conditions',
        description: 'Perfect weather for planting most crops. Soil temperature and moisture are ideal.',
        action: 'Consider planting seeds today'
      });
    }
    
    // Irrigation recommendations
    if (temp > 28 && humidity < 40) {
      recommendations.push({
        category: 'irrigation',
        title: 'Increase Irrigation',
        description: 'Hot and dry conditions require more frequent watering.',
        action: 'Water crops early morning or late evening'
      });
    }
    
    // Harvesting recommendations
    if (condition.includes('clear') || condition.includes('sunny')) {
      recommendations.push({
        category: 'harvesting',
        title: 'Good Harvesting Weather',
        description: 'Clear skies are perfect for harvesting and drying crops.',
        action: 'Consider harvesting mature crops'
      });
    }
    
    // Pest control recommendations
    if (temp >= 20 && temp <= 30 && humidity >= 60) {
      recommendations.push({
        category: 'pest_control',
        title: 'Monitor for Pests',
        description: 'Current conditions favor pest activity.',
        action: 'Inspect crops for pest damage'
      });
    }
    
    return recommendations;
  }
  
  // Get crop-specific advice
  getCropAdvice(weather, cropType) {
    const advice = {
      maize: this.getMaizeAdvice(weather),
      tomatoes: this.getTomatoAdvice(weather),
      beans: this.getBeansAdvice(weather),
      potatoes: this.getPotatoAdvice(weather)
    };
    
    return advice[cropType] || this.getGeneralAdvice(weather);
  }
  
  getMaizeAdvice(weather) {
    const temp = weather.temperature;
    if (temp >= 20 && temp <= 30) {
      return "Ideal temperature for maize growth. Ensure adequate water supply.";
    } else if (temp > 30) {
      return "High temperatures may stress maize plants. Increase irrigation.";
    } else {
      return "Cool weather may slow maize growth. Monitor for pests.";
    }
  }
  
  getTomatoAdvice(weather) {
    const temp = weather.temperature;
    const humidity = weather.humidity;
    
    if (temp >= 18 && temp <= 25 && humidity < 80) {
      return "Perfect conditions for tomatoes. Monitor for fruit development.";
    } else if (humidity > 80) {
      return "High humidity increases blight risk. Ensure good air circulation.";
    } else {
      return "Monitor tomato plants for stress signs.";
    }
  }
  
  getBeansAdvice(weather) {
    const temp = weather.temperature;
    if (temp >= 15 && temp <= 25) {
      return "Good conditions for bean growth. Check for pod development.";
    } else {
      return "Monitor beans for temperature stress.";
    }
  }
  
  getPotatoAdvice(weather) {
    const temp = weather.temperature;
    if (temp >= 15 && temp <= 20) {
      return "Ideal temperature for potato tuber development.";
    } else if (temp > 25) {
      return "High temperatures may reduce potato yield. Consider mulching.";
    } else {
      return "Cool weather is good for potatoes but monitor for frost.";
    }
  }
  
  getGeneralAdvice(weather) {
    return "Monitor your crops regularly and adjust farming practices based on weather conditions.";
  }
}

export default new WeatherService();