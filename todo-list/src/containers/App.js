import React from 'react';
import TodoList from './TodoList';

export default class extends React.Component {

    state = {
        listItems: [
            // {
            //     id: 0,
            //     title: 'Task1',
            //     description: 'Let\'s do it right now',
            //     done: false
            // },
            // {
            //     id: 1,
            //     title: 'Task2',
            //     description: 'Let\'s do it tomorrow',
            //     done: true
            // },
            // {
            //     id: 2,
            //     title: 'Task3',
            //     description: 'Let\'s do it tomorrow',
            //     done: true
            // }
        ]
    }

    addTask = (value) => {
        this.setState(() => (
            {
                listItems: [value, ...this.state.listItems]
            }
        ))
    }

    deleteTask = (id) => {
        let { listItems } = this.state;
        let listItemsNew = listItems.filter((item) => (
            item.id != id
        ));
        this.setState((state) => ({
            listItems: listItemsNew
        }))
    }

    setDone = (id) => {
        let list = this.state.listItems.map(item => ({...item}));
        let row = list.find(el => el.id == id);
        row.done = !row.done;
        this.setState((state) => ({
            listItems: list
        }))
    }

    render() {
        let { listItems } = this.state;
        console.log(listItems);
        return (
            <div className="app">
                <h1>Список задач:</h1>
                <TodoList list={listItems} onAdd={this.addTask} onDelete={this.deleteTask} onDone={this.setDone}  />
            </div>
        )
    }
}