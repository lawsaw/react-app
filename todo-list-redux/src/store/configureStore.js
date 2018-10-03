import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers/main';
import { ping } from '../enchancers/ping';

export const store = createStore(rootReducer, applyMiddleware(ping));