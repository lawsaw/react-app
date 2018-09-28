import React from 'react';
import { connect } from 'react-redux';

import { addItem, deleteItem, toggleFilter } from '../actions/actions'





class App extends React.Component {

  handleAdd = () => {
      console.log(`adding`);

      this.props.addItem('some value');
      console.log(this.props.stateItems);
  }

  handleDelete = () => {
      console.log(`deleting`);
      this.props.deleteItem(5);
      console.log(this.props.stateItems);
  }

  handleToggle = () => {
      console.log(`toggling`);
  }

  handleLog = () => {
      let store = 123;
      console.log(`this is store: ${store}`);
  }

  render() {
    return (
      <div className="App">
        value:
          <button onClick={this.handleAdd}>Add Item</button>
          <button onClick={this.handleDelete}>Delete Item</button>
          <button onClick={this.handleToggle}>Toggle filter</button>
          <button onClick={this.handleLog}>Show Log</button>
      </div>
    );
  }
}



export default connect(
    (state, props) => {
        return {
            stateItems: state.items,
        };
    },
    (dispatch, props) => {
        return {
            addItem: (param) => {
                dispatch(addItem(param))
            },
            deleteItem: (id) => {
                dispatch(deleteItem(id))
            }
        }
    }
)(App);