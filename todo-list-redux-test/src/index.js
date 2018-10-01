import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/style.scss';


import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { setValues } from './reducers/reducers'
import { addItem, deleteItem, toggleFilter } from './actions/actions'


let store = createStore(setValues);

// let unsubscribe = store.subscribe(() =>
//     console.log(store.getState())
// )
//
//
// store.dispatch(toggleFilter(true));
// store.dispatch(toggleFilter(false));
// store.dispatch(addItem('Added new'));
// store.dispatch(deleteItem(1));
//
//
// unsubscribe()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
  ,
  document.getElementById('root')
);
