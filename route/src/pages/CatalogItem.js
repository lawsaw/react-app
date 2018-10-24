import React from 'react'
//import { Link, Route } from 'react-router-dom'

export default class extends React.Component {

    buildContent = (title, content) => {
        return (
            <div>
                <h2>{title}</h2>
                <p>{content}</p>
            </div>
        )
    }

    getContent = () => {
        const {item} = this.props.match.params;
        let title, content;
        switch (item) {
            case 'computers':
                title = 'Computers and electronics';
                content = 'Content of computers...';
                break;
            case 'oranges':
                title = 'Oranges and fruits';
                content = 'Content of oranges...';
                break;
            default:
                title = '404';
                content = 'no page';
                break;
        }
        return this.buildContent(title, content);
    }

    render() {
        return (
            <div>
                {this.getContent()}
            </div>
        )
    }
}