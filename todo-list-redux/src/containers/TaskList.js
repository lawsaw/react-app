import React from 'react'
import { connect } from 'react-redux'
import Task from './Task'
import Modal from './Modal'
import { render } from 'react-dom';

import { addTask, deleteTask, completeTask } from "../actions/TasksAction";

class TaskList extends React.Component {



    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false,
        showModalAddTask: false,

        title: null,
        shortContent: null,
        fullContent: null,
    }


    constructor(props) {
        super(props);
        this.modalRef = React.createRef();

        this.testF = null;
    }

    getTest = (f) => {
        this.testF = f;
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
        // const title = prompt('Название'),
        //       short = prompt('Краткое описание'),
        //       full = prompt('Полное описание');
        let maxId = this.getMaxId();
        const { title, shortContent, fullContent } = this.state;
        this.props.addTask(++maxId, title, shortContent, fullContent);
        this.modalRef.close();
    }


    handleChange = (key, value) => {
        this.setState(() => ({
            [key]: value
        }))
    }


    handleDeleteTask = (id) => {
        this.props.deleteTask(id);
    }

    handleShowModalAddTask = () => {
        this.setState(() => ({
            showModalAddTask: true
        }))
    }

    handleHideModalAddTask = () => {
        this.setState(() => ({
            showModalAddTask: false
        }))
    }

    handleShow1 = () => {
        this.setState(() => ({
            showModal1: true
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

    handleHide1 = () => {
        this.setState(() => ({
            showModal1: false
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

    getRef = (ref) => {
        if(ref) {
            this.modalRef = ref.getWrappedInstance()
        }
    }




    render() {
        const { tasks } = this.props;
        return (
            <div>
                <div className="btn-toolbar mb-3">
                    <button onClick={this.handleShowModalAddTask}>Добавить задачу</button>
                    <button onClick={this.handleShow1}>Тест модалки</button>
                    <button onClick={this.handleAddTask}>Click</button>
                    <button onClick={this.testF}>Test</button>
                </div>

                <div className='list-group'>
                    {
                        tasks.map(({id, title, short, full, completed}, index) => (
                            <Task
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


                {
                    this.state.showModalAddTask ? (

                        <Modal someTest={this.getTest} ref={this.getRef} title='Добавить задачу' handleHide={this.handleHideModalAddTask} styleAppear='modalAwesome--zoomIn' styleDisappear='modalAwesome--toRight'>

                            <form>

                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">
                                        Заголовок:
                                    </label>
                                    <div className="col-sm-8">
                                        <input className="form-control" onChange={(e) => (this.handleChange('title', e.currentTarget.value))} />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">
                                        Короткое описание:
                                    </label>
                                    <div className="col-sm-8">
                                        <textarea className="form-control" onChange={(e) => (this.handleChange('shortContent', e.currentTarget.value))} />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">
                                        Полное описание:
                                    </label>
                                    <div className="col-sm-8">
                                        <textarea className="form-control" onChange={(e) => (this.handleChange('fullContent', e.currentTarget.value))} />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">

                                    </label>
                                    <div className="col-sm-8">
                                        <button type="submit" className="btn btn-primary" onClick={(e) => {e.preventDefault(); this.handleAddTask()}}>Добавить</button>
                                    </div>
                                </div>

                            </form>

                        </Modal>

                    ) : null
                }



                {
                    this.state.showModal1 ? (
                        <Modal title='Первая модалка' handleHide={this.handleHide1} styleAppear='modalAwesome--zoomIn' styleDisappear='modalAwesome--toRight'>
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
                                                </Modal>
                                            ) : null
                                        }

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
)(TaskList)