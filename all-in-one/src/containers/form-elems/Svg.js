import React from 'react';
import cx from 'classnames';



export default class extends React.Component {

    static defaultProps = {
        className: '',
        icon: '#'
    }
    
    render() {
        const {icon, className} = this.props;
        return (
            <svg className={cx(`svgIcon`,`svgIcon--${icon}`, className)}>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`#${icon}`}></use>
            </svg>
        )
    }
}