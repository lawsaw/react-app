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

    handleChange = (key, value) => {
        let newValue = key != 'agree' ? this.validate(value) : value;
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

    validate = (value) => {
        let rules = {
            error: [
                () => {
                    return value.indexOf('fuck') >= 0
                },
                () => {
                    return value.indexOf('huy') >= 0
                }
            ],
            correct: [
                () => {
                    return value.length > 5;
                }
            ]
        };
        let runValidation = (
            () => {
                let result = null;
                rules.correct.forEach((rule) => {
                    if (rule()) {
                        result = true;
                        return;
                    }
                });
                rules.error.forEach((rule) => {
                    if (rule()) {
                        result = false;
                        return;
                    }
                });
                return result;
            }
        )();
        return runValidation;
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
        let className = '';
        switch (rule) {
            case true:
                className = 'is-valid';
                break;
            case false:
                className = 'is-invalid';
                break
            default:
                className = '';
                break;
        }
        return className;
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
                                onChange={e => {this.handleChange('title', e.currentTarget.value)}}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <p>Короткое описание</p>
                            <textarea
                                className={`form-control ${this.setValidClass(validShortContent)}`}
                                onChange={e => {this.handleChange('shortContent', e.currentTarget.value)}}
                            ></textarea>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <p>Полное описание</p>
                            <textarea
                                className={`form-control ${this.setValidClass(validLongContent)}`}
                                onChange={e => {this.handleChange('longContent', e.currentTarget.value)}}
                            ></textarea>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <label>
                                <input type='checkbox' onChange={e => {this.handleChange('agree', e.currentTarget.checked)}} />
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