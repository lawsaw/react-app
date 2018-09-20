import React, { Component } from 'react'

export default class extends Component {

    state = {
        title: '',
        shortContent: '',
        longContent: '',
        agree: false
    }

    handleChange = (key, value) => {
        this.setState((state) => ({[key]: value}))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { title, shortContent, longContent } = this.state;
        let item = {
            title: title,
            shortContent: shortContent,
            longContent: longContent,
        }
        this.props.onAdd(item)
    }

    renderAdd = () => {
        let { agree } = this.state;
        return (
            <React.Fragment>
                <form>
                    <div>
                        <p>Заголовок</p>
                        <input type='text' onChange={e => {this.handleChange('title', e.currentTarget.value)}} />
                    </div>
                    <div>
                        <p>Короткое описание</p>
                        <textarea onChange={e => {this.handleChange('shortContent', e.currentTarget.value)}}></textarea>
                    </div>
                    <div>
                        <p>Полное описание</p>
                        <textarea onChange={e => {this.handleChange('longContent', e.currentTarget.value)}}></textarea>
                    </div>
                    <div>
                        <label>
                            <input type='checkbox' onChange={e => {this.handleChange('agree', e.currentTarget.checked)}} />
                            Я согласен со всеми
                        </label>
                    </div>
                    <div>
                        <button onClick={this.handleSubmit} disabled={!agree} >Добавить</button>
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