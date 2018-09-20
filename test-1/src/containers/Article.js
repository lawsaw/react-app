import React, { Component } from 'react'

export default class extends Component {

    state = {
        readMore: false
    }

    handleReadMoreClick = (e) => {
        e.preventDefault();
        this.setState((state) => ({readMore: !state.readMore}))
        console.log( this.state.readMore )
    }

    renderArticle = () => {
        let { title, shortContent, longContent } = this.props;
        let { readMore } = this.state;
        return (
            <React.Fragment>
                <h4>{title}</h4>
                <div>{shortContent}</div>
                <a
                    href='#'
                    onClick={this.handleReadMoreClick}
                >
                    {
                        readMore ? 'Спрятать' : 'Читать далее'
                    }
                </a>
                {
                   readMore && <div>{longContent}</div>
                }
            </React.Fragment>
        )
    }

    render() {
        let article = this.renderArticle();
        return (
            <div className='article'>
                {article}
            </div>
        )
    }

}