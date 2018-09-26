import React from 'react';
import TodoList from './TodoList';

export default class extends React.Component {

    state = {
        listItems: [
            {
                id: 0,
                title: 'Task1',
                description: 'Let\'s do it right now',
                done: false
            },
            {
                id: 1,
                title: 'Task2',
                description: 'Let\'s do it tomorrow',
                done: true
            },
            {
                id: 2,
                title: 'Task3',
                description: 'Let\'s do it tomorrow',
                done: false
            }
        ],
        filter: 'all' //done, active
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

    setFilter = (value) => {
        this.setState((state) => ({
            filter: value
        }));
    }

    getFilteredData = () => {
        let { listItems, filter } = this.state;
        let listItemsNews;
        switch(filter) {
            case 'all':
                listItemsNews = listItems;
                break;
            case 'done':
                listItemsNews = listItems.filter(item => item.done == true);
                break;
            case 'active':
                listItemsNews = listItems.filter(item => item.done != true);
                break;
            default:
                listItemsNews = listItems;
                break;
        }
        return listItemsNews;
    }

    render() {
        let list = this.getFilteredData();
        return (
            <div className="app">
                <h1>Список задач:</h1>
                <TodoList
                    list={list}
                    onAdd={this.addTask}
                    onDelete={this.deleteTask}
                    onDone={this.setDone}
                    setFilter={this.setFilter}
                />
            </div>
        )
    }
}