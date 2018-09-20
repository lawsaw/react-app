import React from 'react'


class Search extends React.Component {


    handleChange = (e) => {
        this.props.onSearch(
            e.currentTarget.value
        )
    }
    render() {
        return (
            //no need in react.fragment
            <React.Fragment>
                <div className='container'>
                    <h2>Поиск:</h2>
                    <div className='row'>
                        <div className='col'>
                            <input
                                type='text'
                                className='form-control'
                                onChange={this.handleChange}
                                //ref={this.input}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export { Search }
