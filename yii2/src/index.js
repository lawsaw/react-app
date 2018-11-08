import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// fetch(`/resources/svg/svg.svg`, {method: 'get'}).then(response => {
//     response.text().then(content => {
//         let svgContainer = document.getElementById('svg-container');
//         svgContainer.innerHTML = content;
//     });
// });
