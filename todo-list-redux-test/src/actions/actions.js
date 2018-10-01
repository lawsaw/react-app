export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';


export const filters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export function addItem(text) {
    return {
        type: ADD_ITEM,
        text
    }
}

export function deleteItem(id) {
    return {
        type: DELETE_ITEM,
        id
    }
}

export function toggleFilter(filter) {
    return {
        type: TOGGLE_FILTER,
        filter
    }
}