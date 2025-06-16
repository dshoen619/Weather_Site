# Weather App

A modern weather application built with React and TypeScript that provides real-time weather information and activity suggestions based on current weather conditions.

## Features

- 🌍 Search for any city worldwide
- 🌤️ Real-time weather data including:
  - Temperature (current, feels like, min/max)
  - Weather description
  - Humidity
  - Wind speed
- 🎯 Dynamic background images based on weather conditions
- 💡 AI-powered activity suggestions based on current weather
- 🔄 Loading states with visual feedback
- 📱 Responsive design for all devices

## Tech Stack

- React
- TypeScript
- OpenWeatherMap API
- Custom Node.js server for activity suggestions


## Setup

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the Client side:
```bash
cd weather-app
npm start
# or
yarn start
```

5. Start the activity suggestion server (in a separate terminal):
```bash
cd server
npm install
npm start
```

The Client will be available at `http://localhost:3000` and the server will be running at `http://localhost:3001`

## Project Structure

```
weather-app/
├── src/
│   ├── api.ts              # API configuration and functions
│   ├── App.tsx            # Main application component
│   ├── App.css            # Main styles
│   ├── types/
│   │   └── interfaces.ts  # TypeScript interfaces
│   ├── json/
│   │   ├── city_country_list.json  # City data
│   │   └── descriptions.json       # Weather descriptions mapping
│   └── photos/            # Weather background images
├── public/
└── package.json
```
