import React, { Component } from 'react';
import Cub from "./Cub";

export default class extends Component {

    state = {
        value: 1
    }

    setDeg = () => {
        const value = Math.floor(Math.random() * 6) + 1;
        this.setState(() =>({
            value: value
        }))
    }

    render() {
        const {value} = this.state;
        return (
            <React.Fragment>
                <div className={`dice-area`}>
                    <Cub
                        value={value}
                    />
                </div>
                <button onClick={this.setDeg}>Закрутить</button>
            </React.Fragment>
        )
    }
}
