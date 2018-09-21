import React, { Component } from 'react';
import './style/App.css';
import './style/bootstrap.min.css';
import './style/index.css';
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
