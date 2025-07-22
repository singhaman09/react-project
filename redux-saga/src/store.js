import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './features/functions';
import rootSaga from './saga/middleware';

//creates saga middleware
const sagaMiddleware = createSagaMiddleware();
//create store
const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})
//run saga i.e generator function
sagaMiddleware.run(rootSaga);

export default store;
