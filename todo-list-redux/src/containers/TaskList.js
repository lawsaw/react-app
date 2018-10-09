import React from 'react'
import { connect } from 'react-redux'
import Task from './Task'
import { addTask, deleteTask, completeTask } from "../actions/TasksAction";
import ModalForm from "./ModalForm";

class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.someRef = React.createRef();
    }

    state = {

        showModalAddTask: false,

        title: '',
        shortContent: '',
        fullContent: '',

        valid: {
            title: null,
            shortContent: null,
            fullContent: null,
        }

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




    onTaskAdd = () => {
        let maxId = this.getMaxId();
        const { title, shortContent, fullContent } = this.state;
        this.props.addTask(++maxId, title, shortContent, fullContent);
        this.setState(() => ({
            title: null,
            shortContent: null,
            fullContent: null,
        }));
    }





    handleAddTaskForm = (key, value) => {
        this.setState(() => ({
            [key]: value
        }))
    }

    handleDeleteTask = (id) => {
        this.props.deleteTask(id);
    }



    handleModalAddOpen = () => {
        this.setState(() => ({
            showModalAddTask: true
        }))
    }

    handleModalAddClose = () => {
        this.setState(() => ({
            showModalAddTask: false
        }))
    }

    setValidClass = (keyField) => {
        const field = this.state.valid[keyField];
        return field === null ? '' : field ? 'is-valid' : 'is-invalid';
    }

    validate = () => {

        let newState = {
            title: null,
            shortContent: null,
            fullContent: null,
        }

        let fields = [
            {
                name: 'title',
                link: this.state.title
            },
            {
                name: 'shortContent',
                link: this.state.shortContent
            },
            {
                name: 'fullContent',
                link: this.state.fullContent
            }
        ];

        let rule = true;

        fields.forEach((field, key, arr) => {
            newState[field['name']] = field['link'];
            if(!field['link']) rule = false;
        })

        this.setState(() => ({
            valid: newState
        }))

        //console.log(this.state.valid);
        return rule;


    }

    handleModalAddResolveValidate = () => {
        return this.validate();
    }


    handleModalAddResolve = () => {
        if(this.validate()) {
            console.log('errors')
        } else {
            console.log('ok')
        }
        this.onTaskAdd();
        console.log('resolve');
    }

    handleModalAddReject = () => {
        console.log('reject');
    }




    render() {
        //console.log(this.state.showModalAddTask);
        const { tasks } = this.props;
        const confirmContent = (
            <div>
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
            </div>
        );
        return (
            <div>
                <div className="btn-toolbar mb-3">
                    <button onClick={this.handleModalAddOpen}>Добавить задачу</button>
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
                                handleDeleteTask={this.handleDeleteTask}
                                completeTask={this.props.completeTask}
                            />
                        ))
                    }
                </div>


                {
                    this.state.showModalAddTask ? (

                        <ModalForm
                            title='Добавить задачу'
                            styleAppear='modalAwesome--fromLeft'
                            styleDisappear='modalAwesome--toRight'
                            onClose={this.handleModalAddClose}
                            onResolve={this.handleModalAddResolve}
                            onReject={this.handleModalAddReject}
                            onResolveValidate={this.handleModalAddResolveValidate}
                            labelResolve='Добавить'
                            labelReject='Отменить'
                            confirmContent={confirmContent}
                        >
                            <form>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">
                                        Заголовок:
                                    </label>
                                    <div className="col-sm-8">
                                        <input className={`form-control ${this.setValidClass('title')}`} onChange={(e) => (this.handleAddTaskForm('title', e.currentTarget.value))} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">
                                        Короткое описание:
                                    </label>
                                    <div className="col-sm-8">
                                        <textarea className={`form-control ${this.setValidClass('shortContent')}`} onChange={(e) => (this.handleAddTaskForm('shortContent', e.currentTarget.value))} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">
                                        Полное описание:
                                    </label>
                                    <div className="col-sm-8">
                                        <textarea className={`form-control ${this.setValidClass('fullContent')}`} onChange={(e) => (this.handleAddTaskForm('fullContent', e.currentTarget.value))} />
                                    </div>
                                </div>
                            </form>
                        </ModalForm>

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