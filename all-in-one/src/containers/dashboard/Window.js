import React, { Component } from 'react';
import { Toolbar } from './';
import cx from "classnames";

export default class extends Component {

    constructor(props) {
        super(props);
    }

    state = {

    }

    render() {
        return(
            <div className={cx(`dashboardWindow`, `dashboardGrid-item`)}>
                <Toolbar />
                {this.props.children}
            </div>
        )
    }
}