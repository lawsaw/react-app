import { combineReducers } from 'redux';
import { modalReducer } from './modals';

export const rootReducer = combineReducers({
    modals: modalReducer,
})