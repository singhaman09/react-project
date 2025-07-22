import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice' 
import {persistStore , persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'


//defined persistConfig
const persistConfig={
    key:'root',
    storage
};

//combine persistConfig and reducer to persist
const persistedReducer= persistReducer(persistConfig,todoReducer)


export const store= configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck:false,
    }),
    
})

//used persistStore for persistly storing

export const persistor=persistStore(store)