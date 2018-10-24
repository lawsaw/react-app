import { combineReducers } from 'redux';
import { modalReducer } from './modals';
import { userReducer } from './users';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
    modals: modalReducer,
    users: userReducer,
    auth: authReducer,
})