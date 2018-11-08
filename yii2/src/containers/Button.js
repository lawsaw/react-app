import React from 'react';
import cx from 'classnames';
import Svg from './Svg';
import renderHTML from 'react-render-html';

export default class extends React.Component {

    static defaultProps = {
        className: [],
        size: 'sizeL',
        color: 'lightblue',
        tag: 'a',
        iconBefore: {
            className: '',
            type: null, //svg img block
            value: 5,
        },
        iconAfter: {
            className: '',
            type: null, //svg img block
            value: 5,
        },
        attr: {},
        onClick: () => {}
    }
    
    buildClass = (name) => `buttonAwesome--${name}`;

    renderIcon = (icon, pos) => {
        const { type, className, value } = icon;
        return type && (
            <div className={cx(`buttonAwesome-icon buttonAwesome-icon--${pos}`, className)}>
                {
                    type === 'img' ?
                        <img src={value} />
                        : type === 'svg' ?
                        <Svg icon={value} />
                        : type === 'block' ?
                            <div className={`buttonAwesome-icon-image`}>{renderHTML(value)}</div>
                        : null
                }
            </div>
        )
    }
    
    render() {
        const { className, tag, children, size, color, attr, iconBefore, iconAfter, onClick } = this.props;
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
            onClick: onClick,
            ...attr
        };
        const body = React.createElement(tag, options, content);
        return (
            <div className={cx(`buttonAwesome`, this.buildClass(size), this.buildClass(color), className)}>
                {body}
            </div>
        )
    }
}