import React from 'react'
import { connect } from 'react-redux'
import TasksComponent from '../components/Tasks'
import Modal from './Modal'
import { addTask, deleteTask, completeTask } from "../actions/TasksAction";

class Tasks extends React.Component {

    state = {
        readMore: [],
        showModalAdd: false,
        showModal2: false,
        showModal3: false,
        showModal4: false,

    }

    handleReadMore = (id) => {
        console.log(id);
        const { readMore } = this.state;
        let arr = [
            ...readMore
        ];
        arr[id] = !arr[id];
        this.setState((state) => ({
            readMore: arr
        }))
        //console.log(this.state.readMore);
    }

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

    handleDeleteTask = (id) => {
        this.props.deleteTask(id);
    }

    handleShow = () => {
        this.setState(() => ({
            showModalAdd: true
        }))
    }

    handleShow2 = () => {
        this.setState(() => ({
            showModal2: true
        }))
    }

    handleShow3 = () => {
        this.setState(() => ({
            showModal3: true
        }))
    }
    handleShow4 = () => {
        this.setState(() => ({
            showModal4: true
        }))
    }

    handleHide = () => {
        this.setState(() => ({
            showModalAdd: false
        }))
    }

    handleHide2 = () => {
        this.setState(() => ({
            showModal2: false
        }))
    }

    handleHide3 = () => {
        this.setState(() => ({
            showModal3: false
        }))
    }
    handleHide4 = () => {
        this.setState(() => ({
            showModal4: false
        }))
    }

    render() {
        const { tasks } = this.props;
        return (
            <div>
                <div className="btn-toolbar mb-3">
                    <button onClick={this.handleShow}>Добавить задачу</button>
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
                                readMore={this.state.readMore[id]}
                                completed={completed}
                                handleDeleteTask = {this.handleDeleteTask}
                                completeTask = {this.props.completeTask}
                                handleReadMore = {this.handleReadMore}
                            />
                        ))
                    }
                </div>

                {
                    this.state.showModalAdd ? (
                        <Modal title='Добавить задачу' handleHide={this.handleHide} styleAppear='modalAwesome--zoomIn' styleDisappear='modalAwesome--toRight'>
                            <button onClick={this.handleShow2}>Еще модалка</button>
                            {
                                this.state.showModal2 ? (
                                    <Modal title='Вторая модалка' handleHide={this.handleHide2} styleAppear='modalAwesome--zoomIn' styleDisappear='modalAwesome--toRight'>
                                        <br/>
                                        контент
                                        <br/>

                                        <button onClick={this.handleShow3}>3я модалка</button>
                                        {
                                            this.state.showModal3 ? (
                                                <Modal title='Третья модалка' handleHide={this.handleHide3} styleAppear='modalAwesome--zoomIn' styleDisappear='modalAwesome--toRight'>
                                                    <br/>
                                                    контент ++++
                                                    <br/>
                                                    контент +++++++

                                                    <button onClick={this.handleShow4}>4я модалка</button>
                                                    {
                                                        this.state.showModal4 ? (
                                                            <Modal title='4я модалка' handleHide={this.handleHide4} styleAppear='modalAwesome--zoomIn' styleDisappear='modalAwesome--toRight'>
                                                                <br/>
                                                                контент ++++
                                                                <br/>
                                                                контент +++++++<br/>
                                                                контент +++++++<br/>
                                                                контент +++++++<br/>
                                                                контент +++++++
                                                                <br/>
                                                            </Modal>
                                                        ) : null
                                                    }

                                                    <br/>
                                                </Modal>
                                            ) : null
                                        }

                                        контент
                                        <br/>
                                    </Modal>
                                ) : null
                            }
                        </Modal>
                    ) : null
                }

            </div>
        )
    }
}

export default connect(
    store => {
        return {
            tasks: store.tasks,
            test: store.tasks
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