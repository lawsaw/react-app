import React from 'react'


class Article extends React.Component {
    state = {
        //use cameCase notation. and name it something like longContentShow
        long_content_shown: false
    }
    handleShowMore = (e) => {
        const { long_content_shown } = this.state;
        e.preventDefault;
        // ?????????
        this.setState(
            (state)=>({long_content_shown: !state.long_content_shown})
        )
        // switch(long_content_shown) {
        //     case false:
        //         this.setState({long_content_shown: true});
        //         break;
        //     case true:
        //         this.setState({long_content_shown: false});
        //         break;
        // }
    }
    renderArticle = () => {
        const { title, short_content, long_content } = this.props;
        const { long_content_shown } = this.state;
        // again, no need creating variable
        const template = (
            <div className='article'>
                <h3>{title}</h3>
                <p>{short_content}</p>
                <a href='#' onClick={this.handleShowMore}>{long_content_shown ? `Спрятать` : `Читать далее`}</a>
                {
                    long_content_shown && <p>{long_content}</p>
                }
            </div>
        )
        return template;
    }
    render() {
        return (
            //no need on fragment
            <React.Fragment>
                {
                    this.renderArticle()
                }
            </React.Fragment>
        )
    }
}

export { Article }
