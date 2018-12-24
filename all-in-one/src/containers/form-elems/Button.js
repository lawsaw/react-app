import React from 'react';
import cx from 'classnames';
import Svg from './Svg';
import renderHTML from 'react-render-html';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as freeBrandsSvgIcons from '@fortawesome/free-brands-svg-icons';
import * as freeSolidSvgIcons from '@fortawesome/free-solid-svg-icons';

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
            animated: false,
        },
        iconAfter: {
            className: '',
            type: null, //svg img fa block
            value: 5,
            animated: false,
        },
        href: null,
        linkAttr: {},
        onClick: () => {}
    }

    getFaIcon = (icon, list) => {
        let newValue = `fa${icon.charAt(0).toUpperCase() + icon.slice(1)}`;
        let name = this.camelize(newValue.replace(/-/gi, ' '));
        if(Object.keys(list).indexOf(name) !== -1) {
            //console.log(`${name} is in freeBrandsSvgIcons`);
            library.add(list[name]);
            return icon;
        };
    }

    renderIcon = (icon, pos) => {
        const { type, className, value, animated } = icon;
        return type && (
            <div className={cx(`buttonAwesome-icon buttonAwesome-icon--${pos}`, className, animated ? 'buttonAwesome-icon--animated' : '')}>
                {
                    type === 'img' ?
                            <img src={value} alt='' className={`buttonAwesome-icon-image`} />
                        : type === 'svg' ?
                            <Svg icon={value} className={`buttonAwesome-icon-image`} />
                        : type === 'fas' ?
                            <FontAwesomeIcon icon={['fas', this.getFaIcon(value, freeSolidSvgIcons)]} className={`buttonAwesome-icon-image`} />
                        : type === 'fab' ?
                            <FontAwesomeIcon icon={['fab', this.getFaIcon(value, freeBrandsSvgIcons)]} className={`buttonAwesome-icon-image`} />
                        : type === 'block' ?
                            <div className={`buttonAwesome-icon-image`}>{renderHTML(value)}</div>
                        : null
                }
            </div>
        )
    }

    buildClass = name => `buttonAwesome--${name}`;

    camelize = str => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
            return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
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