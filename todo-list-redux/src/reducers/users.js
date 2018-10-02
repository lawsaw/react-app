import { ADD_USER } from "../actions/UserActions";

const initialState = [
    {
        name: 'Jack',
        city: 'Kiev'
    },
    {
        name: 'Ignat',
        city: 'London'
    },
    {
        name: 'Vasiliy',
        city: 'New-York'
    },
]

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_USER:
            const { name, city } = action;
            return [
                {
                    name,
                    city
                },
                ...state.map((user) => ({...user}))
            ]
            //let newState = JSON.parse(JSON.stringify(state));

        default:
            return state
    }
}