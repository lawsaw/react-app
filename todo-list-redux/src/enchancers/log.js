export const log = store => next => action => {
    console.log(store);
    console.log(next);
    console.log(action);
    if(action.type === 'ADD_MODAL') {
        action['newkey'] = 555;
    }
    return next(action)
}