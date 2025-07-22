import { createStore } from 'redux';
import taskReducer from '../reducers/reducer';

const store = createStore(taskReducer);

export default store;