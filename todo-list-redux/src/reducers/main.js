import { combineReducers } from 'redux';
import { userReducer } from "./users";
import { taskReducer } from './tasks';
import { modalReducer } from './modals';

export const rootReducer = combineReducers({
    users: userReducer,
    tasks: taskReducer,
    modals: modalReducer,
})