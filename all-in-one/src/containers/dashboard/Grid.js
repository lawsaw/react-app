import React, { Component } from 'react';
import cx from 'classnames';
import { Window } from './';

export default class extends Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        type: 'col', //col
        content: [1, 2],
    }

    state = {

    }

    render() {
        const { type, content } = this.props;
        return(
            <div className={cx(`dashboardGrid`, `dashboardGrid--${type}`)}>
                {
                    content.map((item, index) => (
                        <Window
                            key={index}
                        >
                            {item}
                        </Window>
                    ))
                }
            </div>
        )
    }
}