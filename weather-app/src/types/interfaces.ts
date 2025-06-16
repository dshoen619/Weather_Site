// Interface for city data structure
export interface CityCountry {
  city: string;
  country: string;
  id: number;
}

// Interface for weather data structure
export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
}

// Interface for activity suggestion response
export interface ActivityResponse {
  response: {
    content: string;
    role: string;
  };
} 