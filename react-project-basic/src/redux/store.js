import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import authSlice from './slices/auth'
import dashboardSlice from './slices/dashboard'
import persistReducer from "redux-persist/es/persistReducer";
// persist configuration 
const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

//configuring store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    dashboard: dashboardSlice,
  },
});

// console  overall current state
store.subscribe(() => {
  console.log("Updated Store:", store.getState());
});

const persistor = persistStore(store);

export { store,persistor }