import {ADD_MODAL, DELETE_MODAL} from "../actions/ModalsAction";

const initialState = [
    {
        id: 0
    }
];

export function modalReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_MODAL:
            return [
                {
                    id: action.id
                },
                ...state.map((modal) => ({...modal})),
            ];
        case DELETE_MODAL:
            return state.filter((modal) => (
                modal.id != action.id
            ))
        default:
            return state
    }

    return state;
}