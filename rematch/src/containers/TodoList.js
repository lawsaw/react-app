import React from 'react';
import {connect} from 'react-redux';
import TodoListItem from './TodoListItem';

class TodoList extends React.Component {
    render() {
        const {count, add, remove, asyncAdd, asyncRemove} = this.props;
        return (
            <div>
                Now we have {count} items;
                <div>
                    <button onClick={add}>Add</button>
                    <button onClick={remove}>Remove</button>
                </div>
                <div>
                    <button onClick={asyncAdd}>async Add</button>
                    <button onClick={asyncRemove}>async Remove</button>
                </div>
                <TodoListItem />
            </div>
        )
    }
}

const mapState = ({count}) => {
    return {
        count: count,
    }
}

const mapDispatch = ({count}) => {
    return {
        add: () => count.add(),
        remove: () => count.remove(),
        asyncAdd: () => count.asyncAdd(),
        asyncRemove: () => count.asyncRemove(),
    }
}

export default connect(mapState, mapDispatch)(TodoList);