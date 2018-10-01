import { combineReducers } from 'redux';
import { userReducer } from "./users";
import { taskReducer } from './tasks';

export const rootReducer = combineReducers({
    users: userReducer,
    tasks: taskReducer,
})