import React, { Component } from 'react'

export default class extends Component {

    state = {
        field: {
            title: '',
            shortContent: '',
            longContent: '',
            agree: false
        },
        validate: {
            title: '',
            shortContent: '',
            longContent: '',
            agree: ''
        }
    }

    handleChange = (type, key, value) => {
        let newValue = type != 'checkbox' ? this.validate(type, value) : value;
        this.setState((state) => ({
            field: {
                ...state.field,
                [key]: value
            },
            validate: {
                ...state.validate,
                [key]: newValue
            }
        }))
    }

    validate = (type, value) => {

        if(!value.length) { return null; }

        switch(type) {
            case 'name':
                if(
                    value.indexOf('fuck') >= 0 ||
                    value.indexOf('huy') >= 0
                ) {
                    return false
                }
                break;
            case 'email':
                if(
                    value.indexOf('@') == -1
                ) {
                    return false
                }
                break;
        }
        return true

    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { title, shortContent, longContent } = this.state.field;
        let item = {
            title: title,
            shortContent: shortContent,
            longContent: longContent,
        }
        this.props.onAdd(item)
    }

    setValidClass = (rule) => {
        return rule === true ? 'is-valid' : rule === false ? 'is-invalid' : ''
    }

    renderAdd = () => {
        let {
            field: { title, shortContent, longContent, agree },
            validate: { title: validTitle, shortContent: validShortContent, longContent: validLongContent, agree: validAgree }
        } = this.state;
        return (
            <React.Fragment>
                <form>
                    <div className='row'>
                        <div className='col'>
                            <p>Заголовок</p>
                            <input
                                type='text'
                                className={`form-control ${this.setValidClass(validTitle)}`}
                                onChange={e => {this.handleChange('email', 'title', e.currentTarget.value)}}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <p>Короткое описание</p>
                            <textarea
                                className={`form-control ${this.setValidClass(validShortContent)}`}
                                onChange={e => {this.handleChange('name', 'shortContent', e.currentTarget.value)}}
                            ></textarea>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <p>Полное описание</p>
                            <textarea
                                className={`form-control ${this.setValidClass(validLongContent)}`}
                                onChange={e => {this.handleChange('name', 'longContent', e.currentTarget.value)}}
                            ></textarea>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <label>
                                <input type='checkbox' onChange={e => {this.handleChange('checkbox', 'agree', e.currentTarget.checked)}} />
                                Я согласен со всеми
                            </label>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={this.handleSubmit}
                            disabled={!agree}
                        >
                            Добавить
                        </button>
                    </div>
                </form>
            </React.Fragment>
        )
    }

    render() {
        let form = this.renderAdd();
        return (
            <div className='add'>
                <h3>Добавить</h3>
                {form}
            </div>
        )
    }

}