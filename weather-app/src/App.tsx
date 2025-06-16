import React, { useState, useEffect } from 'react';
import './App.css';
import cityData from './json/city_country_list.json';
import descriptions from './json/descriptions.json';
import { fetchWeatherByCityId, getWeatherIconUrl, getActivitySuggestion } from './api';
import { CityCountry, WeatherData, ActivityResponse } from './types/interfaces';

// Import background images for different weather conditions
import sunImage from './photos/sun.jpg';
import rainImage from './photos/rain.jpg';
import snowImage from './photos/snow.jpg';
import fogImage from './photos/fog.jpg';
import thunderstormImage from './photos/thunderstorm.jpg';
import cloudyImage from './photos/cloudy.jpg';

// Type assertion for the imported JSON data
const typedCityData = cityData as CityCountry[];

// Mapping of image paths to their imported image modules
// This connects the paths from descriptions.json to the actual image imports
const backgroundImages = {
  'weather-app/src/photos/sun.jpg': sunImage,
  'weather-app/src/photos/rain.jpg': rainImage,
  'weather-app/src/photos/snow.jpg': snowImage,
  'weather-app/src/photos/fog.jpg': fogImage,
  'weather-app/src/photos/thunderstorm.jpg': thunderstormImage,
  'weather-app/src/photos/cloudy.jpg': cloudyImage,
};

function App() {
  // State management for various app features
  const [searchQuery, setSearchQuery] = useState(''); // Current search input
  const [filteredResults, setFilteredResults] = useState<CityCountry[]>([]); // Filtered city search results
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null); // Currently selected city ID
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null); // Weather data for selected city
  const [activitySuggestion, setActivitySuggestion] = useState<ActivityResponse | null>(null); // Activity suggestions
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
  const [loadingStep, setLoadingStep] = useState<'weather' | 'activity' | null>(null); // Current loading step
  const [error, setError] = useState<string | null>(null); // Error state
  const [backgroundImage, setBackgroundImage] = useState<string>(''); // Current background image

  // Handle search input changes and filter city results
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setSelectedCityId(null);
    setWeatherData(null);
    setActivitySuggestion(null);
    setError(null);
    setBackgroundImage('');

    if (query.length > 0) {
      // Filter cities based on search query
      const filtered = typedCityData
        .filter((item) => 
          item.city.toLowerCase().includes(query) || 
          item.country.toLowerCase().includes(query)
        )
        .slice(0, 10); // Limit to 10 results
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]);
    }
  };

  // Handle city selection from search results
  const handleResultClick = (result: CityCountry) => {
    setSearchQuery(`${result.city}, ${result.country}`);
    setSelectedCityId(result.id);
    setFilteredResults([]);
  };

  // Fetch weather data and activity suggestions for selected city
  const handleGetWeather = async () => {
    if (selectedCityId !== null) {
      try {
        setIsLoading(true);
        setError(null);
        setLoadingStep('weather');
        
        // Fetch weather data
        const data = await fetchWeatherByCityId(selectedCityId);
        setWeatherData(data);
        
        // Set background image based on weather description
        const description = data.weather[0].description.toLowerCase();
        const imagePath = (descriptions as { [key: string]: string })[description] || '';
        const imageUrl = backgroundImages[imagePath as keyof typeof backgroundImages] || '';
        setBackgroundImage(imageUrl);
        
        // Fetch activity suggestions
        setLoadingStep('activity');
        const conditions = `${data.weather[0].description} and ${Math.round(data.main.temp)}°C`;
        const activityData = await getActivitySuggestion(data.name, conditions);
        setActivitySuggestion(activityData);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        setWeatherData(null);
        setActivitySuggestion(null);
        setBackgroundImage('');
      } finally {
        setIsLoading(false);
        setLoadingStep(null);
      }
    } else {
      alert('No city selected');
    }
  };

  // Render loading state with spinner and message
  const renderLoadingState = () => {
    if (!isLoading) return null;

    const loadingMessage = loadingStep === 'weather' 
      ? 'Fetching weather data...' 
      : 'Getting activity suggestions...';

    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p className="loading-text">{loadingMessage}</p>
      </div>
    );
  };

  return (
    <div className="App" style={{ 
      backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="search-container">
        <div className="title-container">
          <h1 className="app-title">Weather App</h1>
        </div>
        <div className="search-wrapper">
          {/* Search input and button */}
          <div className="search-input-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search for a city..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <button 
              className="get-weather-btn"
              onClick={handleGetWeather}
              disabled={isLoading}
            >
              {isLoading ? '...' : '→'}
            </button>
          </div>

          {/* Search results dropdown */}
          {filteredResults.length > 0 && (
            <div className="search-results">
              {filteredResults.map((result, index) => (
                <div 
                  key={index} 
                  className="result-item"
                  onClick={() => handleResultClick(result)}
                >
                  {result.city}, {result.country}
                </div>
              ))}
            </div>
          )}

          {/* Error message display */}
          {error && <div className="error-message">{error}</div>}

          {/* Loading state */}
          {renderLoadingState()}

          {/* Weather data display */}
          {weatherData && !isLoading && (
            <div className="weather-data">
              <h2>Weather in {weatherData.name}</h2>
              <div className="weather-main">
                <div className="temperature-container">
                  <img 
                    src={getWeatherIconUrl(weatherData.weather[0].icon)} 
                    alt={weatherData.weather[0].description}
                    className="weather-icon"
                  />
                  <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
                </div>
                <p className="feels-like">Feels like: {Math.round(weatherData.main.feels_like)}°C</p>
              </div>
              <div className="weather-details">
                <p>Description: {weatherData.weather[0].description}</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                <p>Min/Max: {Math.round(weatherData.main.temp_min)}°C / {Math.round(weatherData.main.temp_max)}°C</p>
              </div>
              {/* Activity suggestions */}
              {activitySuggestion && (
                <div className="activity-suggestion">
                  <h3>Suggested Activity</h3>
                  <p>{activitySuggestion.response.content}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
