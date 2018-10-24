import { createStore } from 'redux';
import { rootReducer } from '../reducers/main';

export const store = createStore(rootReducer);