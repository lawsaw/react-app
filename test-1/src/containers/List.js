import React, { Component } from 'react'
import Article from './Article'

export default class extends Component {

    isSearched = (array, key) => {
        let res = false;
        array.forEach((item) => {
            item = item.toLowerCase();
            key = key.toLowerCase();
            if(item.indexOf(key) >= 0) {
                res = true;
            }
        })
        return res;
    }

    renderNews = () => {
        let { list, searchText } = this.props;
        return (
            list.filter((item) => {
                let { title, shortContent, longContent } = item;
                return this.isSearched([ title, shortContent, longContent ], searchText);
            }).map((item, index) => {
                let { title, shortContent, longContent } = item;
                return (
                    <Article
                        key={index}
                        title={title}
                        shortContent={shortContent}
                        longContent={longContent}
                    />
                )
            })

        )
    }

    render() {
        let news = this.renderNews();
        return (
            <div>
                <h2>Список новостей</h2>
                <div className='listNews'>
                    {
                        news.length ? news : <p>Нет новостей</p>
                    }
                </div>
            </div>
        )
    }
}