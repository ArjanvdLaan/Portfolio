import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './components/Inspirational Homepage/components/WeatherBox/WeatherBox.jsx';

export default configureStore({
    reducer: {
      weather: weatherReducer
    }
  });