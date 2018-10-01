import React from 'react'
import { connect } from 'react-redux'
import TasksComponent from '../components/Tasks'
import { addTask, deleteTask, completeTask } from "../actions/TasksAction";

class Tasks extends React.Component {

    getMaxId = () => {
        const { tasks:list } = this.props;
        let max = 0;
        list.forEach(task => {
            if(task.id >= max) max = task.id
        });
        return max;
    }

    handleAddTask = () => {
        const title = prompt('Название'),
              short = prompt('Краткое описание'),
              full = prompt('Полное описание');
        let maxId = this.getMaxId();
        this.props.addTask(++maxId, title, short, full);
    }

    handleDeleteTask = (e, id) => {
        e.preventDefault();
        this.props.deleteTask(id);
    }

    render() {
        const { tasks } = this.props;
        return (
            <div>
                <div className="btn-toolbar mb-3">
                    <button onClick={this.handleAddTask}>Добавить задачу</button>
                </div>

                <div className='list-group'>
                    {
                        tasks.map(({id, title, short, full, completed}, index) => (
                            <TasksComponent
                                key={index}
                                id={id}
                                title={title}
                                short={short}
                                full={full}
                                completed={completed}
                                handleDeleteTask = {this.handleDeleteTask}
                                completeTask = {this.props.completeTask}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    store => {
        return {
            tasks: store.tasks
        }
    },
    dispatch => {
        return {
            addTask: (id, title, short, full) => dispatch(addTask(id, title, short, full)),
            deleteTask: id => dispatch(deleteTask(id)),
            completeTask: id => dispatch(completeTask(id))
        }
    }
)(Tasks)