import React, { Component } from 'react'

export default class extends Component {

    handleChange = (e) => {
        this.props.onSearch(
            e.currentTarget.value
        )
    }

    renderSearch = () => {
        return (
            <React.Fragment>
                <input
                    type='text'
                    onChange={this.handleChange}
                />
            </React.Fragment>
        )
    }

    render() {
        let search = this.renderSearch();
        return (
            <div className='search'>
                <h3>Поиск</h3>
                {search}
            </div>
        )
    }

}