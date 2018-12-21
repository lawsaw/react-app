import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers/main';
//import { log } from '../enchancers/log';
import logger from 'redux-logger';

export const store = createStore(rootReducer, applyMiddleware(logger));