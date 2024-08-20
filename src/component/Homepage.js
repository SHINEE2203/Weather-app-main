import React, { useState, useEffect } from 'react';
import './Homepage.css';

const Homepage = () => {
  const [city, setCity] = useState(''); // Set default city to Chennai
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = '7985b527728442d2bd771f6a6fdf7a15'; // Replace with your actual API key

  // Function to fetch weather data based on city
  const fetchWeatherData = (cityName) => {
    setLoading(true);
    setError(null);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
        console.error('Error fetching weather data:', error); // Log error to console
      });
  };

  // Fetch weather data for Chennai when component mounts
  useEffect(() => {
    fetchWeatherData(city);
  }, []); // Empty dependency array ensures it runs only once on mount

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!city) {
      setError('Please enter a city');
      return;
    }
    fetchWeatherData(city);
  };

  // Handle city input change
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <p id="heading">Weather App</p>
        <div className="field">
          <input
            autoComplete="off"
            placeholder="Enter city"
            className="input-field"
            type="text"
            value={city}
            onChange={handleCityChange}
          />
        </div>
       
        <div className="btn">
          <button className="button3">SUBMIT</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="weather">
            {weatherData.name ? (
              <div className='desc'>
                <h3 id="location">{weatherData.name}</h3> 
                <p id="temperature">{weatherData.main && weatherData.main.temp}°C</p> 
                <p id="description">{weatherData.weather && weatherData.weather[0].description}</p> <br/>
              </div>
            ) : (
              <p>No data available</p>
            )}
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Homepage;
