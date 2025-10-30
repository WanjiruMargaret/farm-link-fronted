# API Integration Guide

## Overview
This document outlines how the FarmLink frontend integrates with backend APIs for weather data, AI diagnosis, and community features.

## API Endpoints

### Weather API
- `GET /api/weather?location={location}` - Current weather data
- `GET /api/weather/forecast?location={location}&days={days}` - Weather forecast

### AI Diagnosis API
- `POST /api/diagnosis` - Submit image/symptoms for AI analysis
- `GET /api/diagnosis/history/{userId}` - Get user's diagnosis history

### Community API
- `GET /api/community/posts?category={category}&page={page}&limit={limit}` - Get posts
- `POST /api/community/posts` - Create new post
- `GET /api/community/posts/{postId}` - Get specific post
- `POST /api/community/posts/{postId}/like` - Like a post
- `POST /api/community/posts/{postId}/replies` - Add reply to post
- `GET /api/community/search?q={query}&category={category}` - Search posts

## Configuration

1. Copy `.env.example` to `.env`
2. Update API endpoints:
   ```
   REACT_APP_API_URL=http://your-backend-url/api
   ```

## API Service Usage

### Weather Integration
```javascript
import apiService from '../services/api';

// Get current weather
const weather = await apiService.getWeatherData('Nairobi, Kenya');

// Get forecast
const forecast = await apiService.getWeatherForecast('Nairobi, Kenya', 7);
```

### AI Diagnosis Integration
```javascript
// Submit diagnosis
const formData = new FormData();
formData.append('image', imageFile);
formData.append('symptoms', 'Plant leaves turning yellow');
formData.append('diagnosisType', 'crop');

const result = await apiService.submitDiagnosis(formData);
```

### Community Integration
```javascript
// Get posts
const posts = await apiService.getPosts('farming-tips', 1, 10);

// Create post
const newPost = await apiService.createPost({
  title: 'Best irrigation methods',
  content: 'What are your recommendations?',
  category: 'irrigation'
});

// Like post
await apiService.likePost(postId);
```

## Error Handling

All API calls include fallback mechanisms:
- Weather: Falls back to mock weather data
- AI Diagnosis: Falls back to simulated analysis
- Community: Falls back to local mock posts

## Authentication

The API service automatically includes authentication tokens from localStorage:
```javascript
const token = localStorage.getItem('authToken');
if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}
```

## Backend Requirements

Your backend should implement these endpoints with the following expected responses:

### Weather Response
```json
{
  "temperature": 24,
  "condition": "Partly Cloudy",
  "humidity": 65,
  "windSpeed": 12,
  "location": "Nairobi, Kenya"
}
```

### AI Diagnosis Response
```json
{
  "disease": "Tomato Blight",
  "confidence": 85,
  "symptoms": ["Dark spots on leaves", "Yellow edges"],
  "treatment": "Apply copper-based fungicide",
  "severity": "high",
  "recommendations": ["Monitor daily", "Take photos"]
}
```

### Community Posts Response
```json
{
  "posts": [
    {
      "id": 1,
      "title": "Best practices for tomato pest control",
      "content": "I've been dealing with whiteflies...",
      "author": "John Kamau",
      "category": "pest-control",
      "likes": 8,
      "replies": [],
      "timeAgo": "2 hours ago"
    }
  ],
  "totalPages": 5,
  "currentPage": 1
}
```

## Testing

To test API integration:
1. Start your backend server
2. Update `.env` with correct API URL
3. Test each feature in the frontend
4. Check browser console for API errors
5. Verify fallback data works when API is unavailable