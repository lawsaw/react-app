import React from 'react';
import TodoListItem from './TodoListItem';

export default class extends React.Component {

    handleAdd = (e) => {
        let title = prompt('Введите название задачи'),
            description = prompt('Опишите подробности');
        if(!title || !description) return false;
        this.props.onAdd({
            title: title,
            description: description,
            done: false
        });
    }

    renderItem = () => {
        let { list } = this.props;
        return (
            list.map(({id, title, description, done} = list, index) => (
                <TodoListItem
                    key={index}
                    id={index}
                    title={title}
                    description={description}
                    done={done}
                    onDelete={() => (this.props.onDelete(id))}
                    onDone={() => (this.props.onDone(id))}
                />
            ))
        )
    }

    render() {
        let items = this.renderItem();
        return (
            <React.Fragment>
                <div className="todo-list">
                    {items}
                </div>
                <div className="row todo-footer">
                    <div className="col align-self-end">
                        <button onClick={this.handleAdd}>Добавить задачу</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}