import React from 'react';
import cx from 'classnames';
import Svg from './Svg';
import renderHTML from 'react-render-html';



import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel, faCoffee, faAngleDown } from '@fortawesome/free-solid-svg-icons';

library.add(faStroopwafel, faCoffee, faAngleDown);

export default class extends React.Component {

    static defaultProps = {
        className: [],
        size: 'sizeL',
        theme: 'blue',
        tag: 'a',
        iconBefore: {
            className: '',
            type: null, //svg img fa block
            value: 5,
        },
        iconAfter: {
            className: '',
            type: null, //svg img fa block
            value: 5,
        },
        href: null,
        linkAttr: {},
        onClick: () => {}
    }
    
    buildClass = (name) => `buttonAwesome--${name}`;

    renderIcon = (icon, pos) => {
        const { type, className, value } = icon;
        return type && (
            <div className={cx(`buttonAwesome-icon buttonAwesome-icon--${pos}`, className)}>
                {
                    type === 'img' ?
                            <img src={value} alt='' className={`buttonAwesome-icon-image`} />
                        : type === 'svg' ?
                            <Svg icon={value} className={`buttonAwesome-icon-image`} />
                        : type === 'fa' ?
                            <FontAwesomeIcon icon={value} className={`buttonAwesome-icon-image`} />
                        : type === 'block' ?
                            <div className={`buttonAwesome-icon-image`}>{renderHTML(value)}</div>
                        : null
                }
            </div>
        )
    }
    
    render() {
        const { className, tag, children, size, theme, linkAttr, href, iconBefore, iconAfter, onClick, ...otherProps } = this.props;
        const content = (
            <React.Fragment>
                {this.renderIcon(iconBefore, 'before')}
                {
                    children && (
                        <div className={`buttonAwesome-title`}>
                            <div className={`buttonAwesome-text`}>
                                {children}
                            </div>
                        </div>
                    )
                }
                {this.renderIcon(iconAfter, 'after')}
            </React.Fragment>
        );
        const options = {
            className: 'buttonAwesome-content',
            onClick,
            href,
            ...linkAttr
        };
        const body = React.createElement(tag, options, content);
        return (
            <div
                className={cx(`buttonAwesome`, this.buildClass(`size${size}`), this.buildClass(theme), className)}
                {...otherProps}
            >
                {body}
            </div>
        )
    }
}