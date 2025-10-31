// WeatherService.js
class WeatherService {
  getWeatherAlerts(weather, location) {
    const alerts = [];
    if (!weather) return alerts;
    const temp = weather.temperature;
    const condition = weather.condition?.toLowerCase() || '';
    const humidity = weather.humidity;

    if (temp > 35) {
      alerts.push({
        type: 'danger',
        title: 'Extreme Heat Warning',
        message: 'Temperatures above 35°C can stress crops and livestock. Increase irrigation and provide shade.',
        priority: 'high',
      });
    } else if (temp < 5) {
      alerts.push({
        type: 'danger',
        title: 'Frost Warning',
        message: 'Risk of frost damage to crops. Cover sensitive plants and move livestock to shelter.',
        priority: 'high',
      });
    }

    if (condition.includes('storm') || condition.includes('thunder')) {
      alerts.push({
        type: 'warning',
        title: 'Storm Alert',
        message: 'Thunderstorms expected. Secure equipment and shelter livestock.',
        priority: 'medium',
      });
    }

    if (condition.includes('rain') && humidity > 90) {
      alerts.push({
        type: 'info',
        title: 'Heavy Rain & High Humidity',
        message: 'Monitor crops for fungal diseases. Ensure proper drainage.',
        priority: 'medium',
      });
    }

    if (humidity > 85) {
      alerts.push({
        type: 'warning',
        title: 'High Humidity Alert',
        message: 'High humidity increases disease risk. Monitor crops closely.',
        priority: 'medium',
      });
    }

    return alerts;
  }

  getFarmingRecommendations(weather, forecast = []) {
    const recommendations = [];
    if (!weather) return recommendations;
    const temp = weather.temperature;
    const condition = weather.condition?.toLowerCase() || '';
    const humidity = weather.humidity;

    if (temp >= 18 && temp <= 25 && humidity >= 50 && humidity <= 70) {
      recommendations.push({
        category: 'planting',
        title: 'Optimal Planting Conditions',
        description: 'Perfect weather for planting most crops.',
        action: 'Consider planting seeds today',
      });
    }

    if (temp > 28 && humidity < 40) {
      recommendations.push({
        category: 'irrigation',
        title: 'Increase Irrigation',
        description: 'Hot and dry conditions require more frequent watering.',
        action: 'Water crops early morning or late evening',
      });
    }

    if (condition.includes('clear') || condition.includes('sunny')) {
      recommendations.push({
        category: 'harvesting',
        title: 'Good Harvesting Weather',
        description: 'Clear skies are perfect for harvesting.',
        action: 'Consider harvesting mature crops',
      });
    }

    if (temp >= 20 && temp <= 30 && humidity >= 60) {
      recommendations.push({
        category: 'pest_control',
        title: 'Monitor for Pests',
        description: 'Conditions favor pest activity.',
        action: 'Inspect crops for pest damage',
      });
    }

    return recommendations;
  }

  getCropAdvice(weather, cropType) {
    const advice = {
      maize: this.getMaizeAdvice(weather),
      tomatoes: this.getTomatoAdvice(weather),
      beans: this.getBeansAdvice(weather),
      potatoes: this.getPotatoAdvice(weather),
    };
    return advice[cropType] || this.getGeneralAdvice(weather);
  }

  getMaizeAdvice(weather) {
    const temp = weather.temperature;
    if (temp >= 20 && temp <= 30) return "Ideal temperature for maize growth.";
    if (temp > 30) return "High temperatures may stress maize plants.";
    return "Cool weather may slow maize growth.";
  }

  getTomatoAdvice(weather) {
    const temp = weather.temperature;
    const humidity = weather.humidity;
    if (temp >= 18 && temp <= 25 && humidity < 80)
      return "Perfect conditions for tomatoes.";
    if (humidity > 80)
      return "High humidity increases blight risk.";
    return "Monitor tomato plants for stress.";
  }

  getBeansAdvice(weather) {
    const temp = weather.temperature;
    if (temp >= 15 && temp <= 25) return "Good conditions for bean growth.";
    return "Monitor beans for temperature stress.";
  }

  getPotatoAdvice(weather) {
    const temp = weather.temperature;
    if (temp >= 15 && temp <= 20)
      return "Ideal temperature for potato development.";
    if (temp > 25)
      return "High temperatures may reduce yield.";
    return "Cool weather is good for potatoes but monitor for frost.";
  }

  getGeneralAdvice() {
    return "Monitor your crops and adjust based on weather.";
  }
}

export default new WeatherService();
