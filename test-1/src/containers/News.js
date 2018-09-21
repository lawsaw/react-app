import React, { Component } from 'react'
import List from './List'
import Search from './Search'
import Add from './Add'
import { apiRequest, delay } from '../helpers.js'

export default class extends Component {


    state = {
        searchText: '',
        list: null
    }

    componentDidMount() {

        apiRequest('GET','./data/list.json')
            .then (
                data => {
                    return delay(data, 3000)
                }
            )
            .then(
                data => {
                    this.setState(() => ({
                        list: data
                    }))
                }
            )

    }

    handleAdd = (item) => {
        this.setState(
            (state) => ({list: [item, ...state.list]})
        )
    }

    handleSearch = (value) => {
        this.setState(
            (state) => ({searchText: value})
        )
    }

    render() {
        let { searchText, list } = this.state;
        return (
            <React.Fragment>
                <Add currentList={list} onAdd={this.handleAdd} />
                <Search onSearch={this.handleSearch} />
                <List list={list} searchText={searchText} />
            </React.Fragment>
        )
    }

}