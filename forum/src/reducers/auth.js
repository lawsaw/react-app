import { LOG_IN, LOG_OUT } from "../actions/AuthAction"

const initialState = {
    user: null,
}

export function authReducer(state = initialState, action) {

    switch (action.type) {
        case LOG_IN:
            return {
                user: action.name
            }
        case LOG_OUT:
            return {
                user: action.name
            }
        default:
            return state
    }



}