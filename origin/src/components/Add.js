import React from 'react'


class Add extends React.Component {
    state = {
        title: '',
        short_content: '',
        long_content: '',
        agree: false
    }
    
    /*
    this 4 functions similar. u can create 1, pass 2 params - key, value
    handleChange = (key, value) => {
        this.setState(()=>({[key]: value}))
    }
    */
    handleChange = (key, value) => {
        this.setState(()=>({[key]: value}))
    }
    handleSubmit = (e) => {
        const { title, short_content, long_content } = this.state;
        e.preventDefault;
        let item = {
            title: title,
            short_content: short_content,
            long_content: long_content,
        };
        this.props.onClick(item);
    }
    renderAdd = () => {
        const { agree } = this.state;
        const template = (
            <form className='form-add'>
                <div className='row'>
                    <div className='col'>
                        {/*and here use - onChange={e => {this.handleChange('title', e.currentTarget.value)}}*/}
                        <input
                            className='form-control'
                            type='text'
                            onChange={(e) => {this.handleChange('title', e.currentTarget.value)}}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        {/*and here use - onChange={e => {this.handleChange('shortContent', e.currentTarget.value)}}*/}
                        <textarea
                            className='form-control'
                            onChange={(e) => {this.handleChange('short_content', e.currentTarget.value)}}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        {/*and here use - onChange={e => {this.handleChange('longContent', e.currentTarget.value)}}*/}
                        <textarea
                            className='form-control'
                            onChange={(e) => {this.handleChange('long_content', e.currentTarget.value)}}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <label>
                            {/*and here use - onChange={e=>{this.handleChange('title', e.currentTarget.checked)}}*/}
                            <input
                                type='checkbox'
                                onChange={(e) => {this.handleChange('agree', e.currentTarget.checked)}}
                            />
                            Я всё проверил и со всем согласен
                        </label>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <button disabled={!agree} onClick={this.handleSubmit}>Добавить</button>
                    </div>
                </div>
            </form>
        );
        return template;
    }
    render() {
        return (
            <React.Fragment>
                <div className='container'>
                    <h2>Добавить новость:</h2>
                    {this.renderAdd()}
                </div>
            </React.Fragment>
        )
    }
}

export { Add }
