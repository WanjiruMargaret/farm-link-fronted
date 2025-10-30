# Backend API Requirements

## Your Backend Must Handle:

### 1. Weather Endpoints
```
GET /api/weather?location=Nairobi
GET /api/weather/forecast?location=Nairobi&days=5
```
**Backend integrates with:** OpenWeatherMap API, WeatherAPI, etc.

### 2. AI Diagnosis Endpoints  
```
POST /api/diagnosis (with image file + symptoms)
```
**Backend integrates with:** Hugging Face, Google Vision API, custom ML model

### 3. Community Endpoints
```
GET /api/community/posts?category=farming-tips
POST /api/community/posts
POST /api/community/posts/:id/like
POST /api/community/posts/:id/replies
```
**Backend uses:** Database (MongoDB, PostgreSQL, etc.)

### 4. Market Prices
```
GET /api/market/prices
```
**Backend integrates with:** Market data APIs, web scraping, manual updates

## Frontend Only:
- Sends requests to YOUR backend
- Displays the processed data
- Handles user interface

## Backend Responsibilities:
- Call external APIs (weather, AI services)
- Process and format data
- Store in database
- Return clean JSON to frontend