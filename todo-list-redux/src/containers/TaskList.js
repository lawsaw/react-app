import React from 'react'
import { connect } from 'react-redux'
import Task from './Task'
import Modal from './Modal'
import { addTask, deleteTask, completeTask } from "../actions/TasksAction";

class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.someRef = React.createRef();
    }

    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false,
        showModalAddTask: false,

        showModalConfirmAdd: false,

        title: null,
        shortContent: null,
        fullContent: null,
    }

    playFunction = (ref) => {
        if(ref) {
            this.someRef = ref.getWrappedInstance()
        }
    }

    getMaxId = () => {
        const { tasks:list } = this.props;
        let max = 0;
        list.forEach(task => {
            if(task.id >= max) max = task.id
        });
        return max;
    }

    handleSubmitAddTaskForm = () => {

        // some validation can be here...
        this.modalOpenViaKey('showModalConfirmAdd');

    }


    onTaskAdd = (key, closeFunction) => {
        let maxId = this.getMaxId();
        const { title, shortContent, fullContent } = this.state;
        this.props.addTask(++maxId, title, shortContent, fullContent);
        this.setState(() => ({
            title: null,
            shortContent: null,
            fullContent: null,
        }))
        this.onResolve(key, closeFunction);
        setTimeout(() => {
            //this.onReject('showModalAddTask', closeFunction);
            this.someRef.close(
                (f) => {this.modalCloseViaKey('showModalAddTask')}
            );
        },200)
    }





    handleAddTaskForm = (key, value) => {
        this.setState(() => ({
            [key]: value
        }))
    }

    handleDeleteTask = (id) => {
        this.props.deleteTask(id);
    }

    onResolve = (key, closeFunction) => {
        //console.log('resolve!');
        setTimeout(() => {
            closeFunction(() => {
                this.setState(() => ({
                    [key]: false
                }))
            })
        },500);
    }

    onReject = (key, closeFunction) => {
        //console.log('Rejected!');
        closeFunction(() => {
            this.setState(() => ({
                [key]: false
            }))
        })
    }

    modalOpenViaKey = (key) => {
        this.setState(() => ({
            [key]: true
        }))
    }

    modalCloseViaKey = (key) => {
        this.setState(() => ({
            [key]: false
        }))
    }











    render() {
        //console.log(this.state.showModalAddTask);
        const { tasks } = this.props;
        return (
            <div>
                <div className="btn-toolbar mb-3">
                    <button onClick={() => {this.modalOpenViaKey('showModalAddTask')}}>Добавить задачу</button>
                    <button onClick={() => {this.modalOpenViaKey('showModal1')}}>Тест модалки</button>
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

                        <Modal
                            title='Добавить задачу'
                            styleAppear='modalAwesome--zoomIn'
                            styleDisappear='modalAwesome--toRight'
                            onResolve={(f) => {this.onResolve('showModalAddTask', f)}}
                            onReject={(f) => {this.onReject('showModalAddTask', f)}}
                            ref={this.playFunction}
                        >
                            <form>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">
                                        Заголовок:
                                    </label>
                                    <div className="col-sm-8">
                                        <input className="form-control" onChange={(e) => (this.handleAddTaskForm('title', e.currentTarget.value))} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">
                                        Короткое описание:
                                    </label>
                                    <div className="col-sm-8">
                                        <textarea className="form-control" onChange={(e) => (this.handleAddTaskForm('shortContent', e.currentTarget.value))} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">
                                        Полное описание:
                                    </label>
                                    <div className="col-sm-8">
                                        <textarea className="form-control" onChange={(e) => (this.handleAddTaskForm('fullContent', e.currentTarget.value))} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">

                                    </label>
                                    <div className="col-sm-8">
                                        <button type="submit" className="btn  btn-secondarybtn-primary" onClick={(e) => {e.preventDefault(); this.handleSubmitAddTaskForm()}}>Добавить</button>
                                    </div>
                                </div>
                            </form>

                        </Modal>

                    ) : null
                }

                {
                    this.state.showModalConfirmAdd ? (
                        <Modal
                            title='Вы уверены, что хотите добавить запись?'
                            styleAppear='modalAwesome--zoomIn'
                            styleDisappear='modalAwesome--toRight'
                            onResolve={    (f) => {this.onTaskAdd('showModalConfirmAdd', f)}     }
                            onReject={(f) => {this.onReject('showModalConfirmAdd', f)}}
                        >
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">
                                    Заголовок:
                                </label>
                                <div className="col-sm-8">
                                    {this.state.title}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">
                                    Коротко:
                                </label>
                                <div className="col-sm-8">
                                    {this.state.shortContent}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">
                                    Полный текст:
                                </label>
                                <div className="col-sm-8">
                                    {this.state.fullContent}
                                </div>
                            </div>

                        </Modal>
                    ) : null
                }

                {
                    this.state.showModal1 ? (
                        <Modal
                            title='Первая модалка'
                            styleAppear='modalAwesome--zoomIn'
                            styleDisappear='modalAwesome--toRight'
                            onResolve={(f) => {this.onResolve('showModal1', f)}}
                            onReject={(f) => {this.onReject('showModal1', f)}}
                        >
                            <button onClick={() => {this.modalOpenViaKey('showModal2')}}>Еще модалка</button>

                            {
                                this.state.showModal2 ? (
                                    <Modal
                                        title='Вторая модалка'
                                        styleAppear='modalAwesome--zoomIn'
                                        styleDisappear='modalAwesome--toRight'
                                        onResolve={(f) => {this.onResolve('showModal2', f)}}
                                        onReject={(f) => {this.onReject('showModal2', f)}}
                                    >
                                        <br/>
                                        контент
                                        <br/>
                                        <button onClick={() => {this.modalOpenViaKey('showModal3')}}>3я модалка</button>

                                        {
                                            this.state.showModal3 ? (
                                                <Modal
                                                    title='Третья модалка'
                                                    styleAppear='modalAwesome--zoomIn'
                                                    styleDisappear='modalAwesome--toRight'
                                                    onResolve={(f) => {this.onResolve('showModal3', f)}}
                                                    onReject={(f) => {this.onReject('showModal3', f)}}
                                                >
                                                    <br/>
                                                    контент ++++
                                                    <br/>
                                                    контент +++++++
                                                    <button onClick={() => {this.modalOpenViaKey('showModal4')}}>4я модалка</button>

                                                    {
                                                        this.state.showModal4 ? (
                                                            <Modal
                                                                title='4я модалка'
                                                                styleAppear='modalAwesome--zoomIn'
                                                                styleDisappear='modalAwesome--toRight'
                                                                onResolve={(f) => {this.onResolve('showModal4', f)}}
                                                                onReject={(f) => {this.onReject('showModal4', f)}}
                                                            >
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
    },
    null,
    { withRef: true }
)(TaskList)