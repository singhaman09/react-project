import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {store,persistor} from './app/store.js'
import { PersistGate } from 'redux-persist/integration/react'; //delays the rendering of app's UI until the persisted state has been retrieved and saved to Redux.

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App/>
    </PersistGate>
  </Provider>
)
