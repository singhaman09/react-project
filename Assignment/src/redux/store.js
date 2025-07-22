// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authentication";
import contactReducer from '../redux/slices/contact'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contact:contactReducer
  },
});
