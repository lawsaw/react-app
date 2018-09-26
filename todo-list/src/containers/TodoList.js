import React from 'react';
import TodoListItem from './TodoListItem';

export default class extends React.Component {

    getMaxId = () => {
        let { list } = this.props;
        let max = 0;
        list.forEach((item) => {
            if( item.id > max ) {
                max = item.id
            }
        })
        return max;
    }

    handleAdd = (e) => {
        let title = prompt('Введите название задачи'),
            description = prompt('Опишите подробности');
        if(!title || !description) return false;
        let max = this.getMaxId();
        this.props.onAdd({
            id: ++max,
            title: title,
            description: description,
            done: false
        });
    }

    renderItem = () => {
        let { list } = this.props;
        let max = this.getMaxId();
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
                <div className="row todo-header">
                    <div className="col">
                        <button onClick={() => this.props.setFilter('all')}>Все</button>
                        <button onClick={() => this.props.setFilter('done')}>Выполненные</button>
                        <button onClick={() => this.props.setFilter('active')}>Активные</button>
                    </div>
                </div>
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