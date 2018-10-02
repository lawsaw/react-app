import React from 'react';
//import Users from './Users'
import Tasks from './Tasks'

export default class extends React.Component {
    render() {
        return (
            <div className='container'>
                <h1>ToDo List with Redux</h1>
                <Tasks />
                {/*<Users test='hello' />*/}
            </div>
        )
    }
}

