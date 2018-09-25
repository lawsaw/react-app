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
        let listItemsNew = [];
        listItems.filter((item) => {
            if(item.id != id) {
                listItemsNew.push(item)
            }
        });
        this.setState((state) => ({
            listItems: listItemsNew
        }))
    }

    setDone = (id) => {
        let { listItems } = this.state;
        let filter = listItems.map((item) => {
            item.done = item.id == id ? !item.done : item.done;
            this.setState((state) => ({
                listItems: [
                    ...this.state.listItems
                ]
            }))
        });
    }

    render() {
        let { listItems } = this.state;
        return (
            <div className="app">
                <h1>Список задач:</h1>
                <TodoList list={listItems} onAdd={this.addTask} onDelete={this.deleteTask} onDone={this.setDone}  />
            </div>
        )
    }
}