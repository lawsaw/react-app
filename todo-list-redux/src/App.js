import React, { Component } from 'react';
import Main from './containers/App';

class App extends Component {
  render() {
    return (
      <div className="wrap">
          <div className="container">
              <Main />
          </div>
      </div>
    );
  }
}

export default App;
