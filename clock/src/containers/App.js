import React from 'react'
import Clock from './Clock'
import '../styles/style.scss';

export default class extends React.Component {
    render() {
        return(
            <div className="container">
                <Clock />
            </div>
        )
    }
}