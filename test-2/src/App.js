import React, { Component } from 'react';
import './style/style.scss';
import News from './containers/News'

class App extends Component {
    render() {
        return (
            <div className='wrap'>
                <div className='container'>
                    <News />
                </div>
            </div>
        )
    }
}

export default App;
