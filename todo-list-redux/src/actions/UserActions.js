export const ADD_USER = 'ADD_USER'
export function addUser(name, city) {
    return {
        type: ADD_USER,
        name,
        city
    }
}