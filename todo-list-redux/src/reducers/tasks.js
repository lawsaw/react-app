import {ADD_TASK, COMPLETE_TASK, DELETE_TASK} from "../actions/TasksAction";

const initialState = [
    {
        id: 0,
        title: 'Task #1',
        short: 'Do it.',
        full: 'Do it right now!!!',
        completed: false
    },
    {
        id: 1,
        title: 'Task #2',
        short: 'Do it.',
        full: 'Do it right now!!!',
        completed: false
    },
    {
        id: 2,
        title: 'Task #3',
        short: 'Do it.',
        full: 'Do it right now!!!',
        completed: false
    }
];

export function taskReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_TASK:
            const { id, title, short, full } = action;
            return [
                {
                    id,
                    title,
                    short,
                    full,
                    completed: false
                },
                ...state
            ];
        case DELETE_TASK:
            return state.filter((task) => (
                task.id != action.id
            ))
        case COMPLETE_TASK:
            let newState = state.map(task => ({...task}));
            let changedItem = newState.find(item => item.id == action.id);
            changedItem.completed = !changedItem.completed;
            console.log(newState);
            console.log(changedItem);
            return newState;
        default:
            return state
    }

    return state;
}