export const ADD_TASK = 'ADD_TASK';
export function addTask(id, title, short, full) {
    return {
        type: ADD_TASK,
        id,
        title,
        short,
        full
    }
}

export const DELETE_TASK = 'DELETE_TASK';
export function deleteTask(id) {
    return {
        type: DELETE_TASK,
        id
    }
}

export const COMPLETE_TASK = 'COMPLETE_TASK';
export function completeTask(id) {
    return {
        type: COMPLETE_TASK,
        id
    }
}