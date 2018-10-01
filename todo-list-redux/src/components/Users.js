import React from 'react'

export default class extends React.Component {
    render() {
        const { name, city } = this.props;
        return (
            <div className='user-item'>
                <h2>{name}</h2>
                <p>{city}</p>
            </div>
        )
    }
}
