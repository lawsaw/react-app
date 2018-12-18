import React from 'react';
import cx from 'classnames';

export default class extends React.Component {
    render() {
        const {face, children} = this.props;
        return (
            <div className={cx(`cubeAwesome-face`, `cubeAwesome-face--${face}`)}>
                <div className={`cubeAwesome-face-front`}>
                    <div className={`cubeAwesome-face-front-content`}>
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}