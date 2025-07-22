import {legacy_createStore as createStore, applyMiddleware} from 'redux'; 
import createSagaMiddleware from 'redux-saga'
import {getEmployeereducer } from './reducer';
import empoyeeSaga from './user-saga';

const middleware = createSagaMiddleware();
export const store = createStore(getEmployeereducer , applyMiddleware(middleware))
middleware.run(empoyeeSaga)