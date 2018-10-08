import React from 'react';
//import Users from './Users'
import TaskList from './TaskList'
import TestModal from './TestModal'

export default class extends React.Component {
    render() {
        return (
            <div className='container'>
                <h1>ToDo List with Redux</h1>
                <TaskList />
                <TestModal />
                {/*<Users test='hello' />*/}
            </div>
        )
    }
}

