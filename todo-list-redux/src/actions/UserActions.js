export const ADD_USER = 'ADD_USER'
export function addUser(name, city) {
    return {
        type: ADD_USER,
        payload: {
            name: name,
            city: city
        }
    }
}