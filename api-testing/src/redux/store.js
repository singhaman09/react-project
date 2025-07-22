// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
// import soundReducer from './postSlice';
import soundReducer from './postSlice';

export const store = configureStore({
  reducer: {
    sounds: soundReducer,
  },
});
