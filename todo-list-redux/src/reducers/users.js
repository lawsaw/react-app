import { ADD_USER } from "../actions/UserActions";

const initialState = {
    userList: [
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
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_USER:

            let newState = JSON.parse(JSON.stringify(state));

            let c = {
                userList: state.userList.map((item) => ({...item}))
            }

            let b = {
                userList: [
                    ...state.userList,
                    {
                        name: action.payload.name,
                        city: action.payload.city,
                    }
                ],
            };

            let a = [
                ...state.userList,
                {
                    name: action.payload.name,
                    city: action.payload.city,
                }
            ];
            console.log(`a: ${a}`);
            console.log(`b: ${b}`);
            console.log(`c: ${c}`);
            console.log(`newState: ${newState}`);

            return b;
        default:
            return state
    }
}