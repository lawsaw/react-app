import React, { Component } from 'react';
import { Window, Grid } from './';

export default class extends Component {

    constructor(props) {
        super(props);
    }

    state = {

    }

    render() {
        return(
            <div className="dashboard">
                <Grid
                    type={`row`}
                    content={[
                        3,
                        <Grid
                            type={`col`}
                            content={[
                                3,
                                5
                            ]}
                        />
                    ]}
                />
            </div>
        )
    }
}