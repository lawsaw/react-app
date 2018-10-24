export const ADD_MODAL = 'ADD_MODAL';
export function addModal(id) {
    return {
        type: ADD_MODAL,
        id
    }
}

export const DELETE_MODAL = 'DELETE_MODAL';
export function deleteModal(id) {
    return {
        type: DELETE_MODAL,
        id
    }
}