import { WeatherData, ActivityResponse } from './types/interfaces';

// API configuration
const API_KEY = '8042d3d28acc15dc16ab90af6458df7d';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const ICON_URL = 'https://openweathermap.org/img/wn';
const SERVER_URL = 'http://localhost:3001';

// Helper function to get weather icon URL
export const getWeatherIconUrl = (iconCode: string): string => {
  return `${ICON_URL}/${iconCode}@2x.png`;
};

// API functions
export const fetchWeatherByCityId = async (cityId: number): Promise<WeatherData> => {
  try {
    const url = `${BASE_URL}?id=${cityId}&appid=${API_KEY}&units=metric`;
    console.log(url);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getActivitySuggestion = async (city: string, conditions: string): Promise<ActivityResponse> => {
  try {
    const prompt = `what is a good activity to do in ${city} in the following weather conditions: ${conditions}; at the time of day. Limit your response to 2 sentences.`;
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error getting activity suggestion:', error);
    throw error;
  }
};

