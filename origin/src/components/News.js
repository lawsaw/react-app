import React from 'react'

import { Article } from './Article'

class News extends React.Component {
    renderNews = () => {
        const { data } = this.props;

        let rows = data.filter((item, index) => {
            const {title, short_content, long_content} = item;
            if(
                title.indexOf(this.props.searchText) >= 0 ||
                short_content.indexOf(this.props.searchText) >= 0 ||
                long_content.indexOf(this.props.searchText) >= 0
            ) {
                return true
            }
        }).map(({title, short_content, long_content}, index) => (
            <Article
                key={index}
                title={title}
                short_content={short_content}
                long_content={long_content}
            />
        ))
        return rows;


    }
    render() {
        let news = this.renderNews();
        return (
            //same, no need fragment

            <React.Fragment>

                {
                    <div className='news'>
                        <h2>Новости</h2>
                        <div className='article-list'>
                            {
                                /*
                                u can move empty here.
                                renderNews can return array of news.
                                in render create variable, eg: let news = this.renderNews();
                                check here news's length:
                                news.length ? news : (<p>Нет новостей</p>)
                                */
                                news.length ? news : <p>Нет новостей</p>
                            }
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }
}

export { News }
