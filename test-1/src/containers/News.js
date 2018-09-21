import React, { Component } from 'react'
import List from './List'
import Search from './Search'
import Add from './Add'

export default class extends Component {


    state = {
        searchText: '',
        list: [
            {
                title: 'Новости политики',
                shortContent: 'Жили были президенты...',
                longContent: 'Это полная версия текста про Жили были президенты...'
            },
            {
                title: 'Новости финансов',
                shortContent: 'Денег нет и не будет...',
                longContent: 'Это полная версия текста про Денег нет и не будет...'
            },
            {
                title: 'Новости экономики',
                shortContent: 'Экономия должна быть во всем...',
                longContent: 'Это полная версия текста про Экономия должна быть во всем...'
            }
        ]
    }

    // componentWillMount() {
    //     this.setState(() => ({
    //         list: [
    //             {
    //                 title: 'Новости политики',
    //                 shortContent: 'Жили были президенты...',
    //                 longContent: 'Это полная версия текста про Жили были президенты...'
    //             },
    //             {
    //                 title: 'Новости финансов',
    //                 shortContent: 'Денег нет и не будет...',
    //                 longContent: 'Это полная версия текста про Денег нет и не будет...'
    //             },
    //             {
    //                 title: 'Новости экономики',
    //                 shortContent: 'Экономия должна быть во всем...',
    //                 longContent: 'Это полная версия текста про Экономия должна быть во всем...'
    //             }
    //         ]
    //     }))
    // }

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