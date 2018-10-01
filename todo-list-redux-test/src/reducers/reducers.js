import { combineReducers } from 'redux';
import {filters, TOGGLE_FILTER, ADD_ITEM, DELETE_ITEM} from '../actions/actions';

const initialState = {
    items: [
        {
            id: 1,
            text: 'item 1, do it...',
            completed: true,
        },{
            id: 2,
            text: 'item 2, do it too...',
            completed: false,
        }
    ],
    showFilter: filters.SHOW_ALL
}

export function setValues(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_FILTER:
            // let newSatte = {...state};
            // newSatte.showFilter: action.filter;
            // return newSatte;
            return Object.assign({}, state, {
                showFilter: action.filter
            });
        case ADD_ITEM:
            return Object.assign({}, state, {
                items: [
                    ...state.items,
                    {
                        id: 5,
                        text: action.text,
                        completed: false
                    }
                ]
            })
        case DELETE_ITEM:
            return Object.assign({}, state, {
                items: state.items.filter((item) => (
                    item.id != action.id
                ))
            })
        default:
            return state;
    }
}

const reducer = combineReducers({
    a: setValues
})