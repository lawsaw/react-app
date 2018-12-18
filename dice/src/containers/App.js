import React from 'react';
import Cub from './Cub';
import '../styles/style.scss';

export default class extends React.Component {

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
            <div className={`wrap`}>

                <div className={`area`}>
                    <div>
                        <Cub
                            value={value}
                        />
                    </div>
                </div>
                <button onClick={this.setDeg}>Закрутить</button>
            </div>
        )
    }
}