import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './styles/style.scss';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/configureStore'
import { Provider } from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app-root')
);
