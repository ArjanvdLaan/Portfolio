import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (endpoint) => {
      console.log('Dispatching action:', fetchWeatherData.type);
      try {
          const response = await fetch(endpoint);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('There was a problem with the fetch operation:', error.message);
          throw error;
      }
  }
);


// export const fetchWeatherData = async (endpoint) => {
//     try {
//       const response = await fetch(endpoint);
//       const data = await response.json();
//       const weatherData = {
//         description: data.weather[0].description,
//         temperature: data.main.temp
//       };
//       return weatherData;
//     } catch (error) {
//       throw new Error('Unable to fetch weather data');
//     }
//   };