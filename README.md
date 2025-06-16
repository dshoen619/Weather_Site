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

## Screenshots

![Weather App Interface](Screen%20Shot%202025-06-16%20at%209.22.11%20PM.png)

## Tech Stack

- React
- TypeScript
- OpenWeatherMap API
- Custom Node.js server for activity suggestions


## Setup

1. Clone the repository:
```bash
git clone https://github.com/dshoen619/Weather_Site.git
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
```

4. Enter the OpenAI Key:
Go to functions.js. Enter the API Key on line 4.

5. Start the activity suggestion server (in a separate terminal):
```bash
cd server
npm install
npm run dev
```

The Client will be available at `http://localhost:3000` and the server will be running at `http://localhost:3001`

## Project Structure

```
Weather_Site/
├── weather-app/           # React client application
│   ├── src/
│   │   ├── api.ts              # API configuration and functions
│   │   ├── App.tsx            # Main application component
│   │   ├── App.css            # Main styles
│   │   ├── types/
│   │   │   └── interfaces.ts  # TypeScript interfaces
│   │   ├── json/
│   │   │   ├── city_country_list.json  # City data
│   │   │   └── descriptions.json       # Weather descriptions mapping
│   │   └── photos/            # Weather background images
│   ├── public/
│   └── package.json
│
├── server/                # Node.js server for activity suggestions
│   ├── src/
│   │   └── server.js     # Server implementation
│   └── package.json
│
└── json/                 # Shared JSON data and processing
    ├── city_country_list.json  # Master city data file
    └── main.py           # Python script for processing city data that will be used for the user search
```
