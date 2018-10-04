import React from 'react';
//import Users from './Users'
import TaskList from './TaskList'

export default class extends React.Component {
    render() {
        return (
            <div className='container'>
                <h1>ToDo List with Redux</h1>
                <TaskList />
                {/*<Users test='hello' />*/}
            </div>
        )
    }
}

