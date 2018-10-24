export const LOG_IN = 'LOG_IN';
export function logIn(name) {
    return {
        type: LOG_IN,
        name
    }
}

export const LOG_OUT = 'LOG_OUT';
export function logOut(name) {
    return {
        type: LOG_OUT,
        name
    }
}