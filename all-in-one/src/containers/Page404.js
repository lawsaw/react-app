import React, { Component } from 'react';

export default class extends Component {
    render() {
        const { page } = this.props;
        return (
            <div className={`page`}>
                <h1>404</h1>
                <p>{page} is not found</p>
            </div>
        )
    }
}
