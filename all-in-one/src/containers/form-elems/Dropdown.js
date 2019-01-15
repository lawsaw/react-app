import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import cx from 'classnames';
import { isClassComponent, isFunctionComponent, isReactComponent, isElement, isDOMTypeElement, isCompositeTypeElement } from '../../helpers';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.frontend = React.createRef();
        this.backend = React.createRef();
    }

    state = {
        dropdownShow: false,
        classStatus: '',
        classActive: '',
        position: {
            x: 0,
            y: 0,
            width: 0
        }
    }

    static defaultProps = {
        button: true,
        title: 'Dropdown',
        duration: 300,
        closeOnClick: true,
        front: 'Dropdown',
    }

    componentDidMount() {
        this.dropdownRoot = document.getElementById('dropdown-root');
        this.setPosition();
        window.addEventListener('click', this.click, false);
        window.addEventListener('resize', this.setPosition, false);
        window.addEventListener('scroll', this.setPosition, false);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.click, false);
        window.removeEventListener('resize', this.setPosition, false);
        window.removeEventListener('scroll', this.setPosition, false);
    }

    open = () => {
        const {duration} = this.props;
        this.setState(() => ({
            dropdownShow: true,
            classStatus: 'dropdownAwesome-back--appear',
            classActive: 'dropdownAwesome-front--active',
        }));
        setTimeout(() => {
            this.setState(() => ({
                classStatus: ''
            }));
        }, duration)
    }

    close = () => {
        const {duration} = this.props;
        this.setState(() => ({
            classStatus: 'dropdownAwesome-back--disappear',
            classActive: '',
        }));
        setTimeout(() => {
            this.setState(() => ({
                dropdownShow: false,
                classStatus: ''
            }));
        }, duration)
    }

    setPosition = () => {
        const position = this.getPosition();
        this.setState(() => ({
            position: {
                x: position.posX,
                y: position.posY,
                width: position.width,
            }
        }));
    }

    getPosition = () => {
        const positionData = this.frontend.getBoundingClientRect();
        if(!positionData) return false;
        const {height, left, top, width} = positionData;
        return {
            posX: left,
            posY: top + height,
            width
        }
    }

    click = (e) => {
        const {closeOnClick} = this.props;
        const {dropdownShow} = this.state;
        if(e.target === this.frontend || this.isDescendant(this.frontend, e.target)) {
            if(dropdownShow) {
                this.close();
                return false;
            } else {
                this.open();
                return false;
            }
        }
        if(dropdownShow) {
            if(e.target === this.backend || this.isDescendant(this.backend, e.target)) {
                if(e.target.getAttribute('href') && closeOnClick) this.close();
                return false;
            } else {
                this.close();
            }
        }
    }

    isDescendant = (parent, child) => {
        let node = child.parentNode;
        while (node != null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    setFrontOptions = (element) => {
        if(!element) return false;
        this.frontend = element;
        window.addEventListener('click', this.click);
    }

    renderFront = () => {
        const { classActive } = this.state;
        const { front, className } = this.props;
        const options = isCompositeTypeElement(front) ? {
                type: front.type,
                key: 'Ref',
                front: front.props.children,
            } : {
                type: 'span',
                key: 'ref',
                front: front,
            }
        const newFront = React.createElement(
            options.type,
            {
                ...front.props,
                [options.key]: el => this.setFrontOptions(el),
                className: cx(`dropdownAwesome-front`, classActive, className)
            },
            options.front
        )
        return newFront;
    }

    renderBack = () => {
        const {children, duration} = this.props;
        const {classStatus, position: {x:posX, y:posY, width}} = this.state;
        return (
            <div
                className={cx(`dropdownAwesome-back`, classStatus)}
                style={{
                    left:               `${posX}px`,
                    top:                `${posY}px`,
                    minWidth:           `${width}px`,
                    animationDuration:  `${duration/1000}s`
                }}
                ref={el => this.backend = el}
            >
                {children}
            </div>
        )
    }

    render() {
        const { dropdownShow } = this.state;
        return (
            <React.Fragment>
                {this.renderFront()}
                {
                    dropdownShow && ReactDOM.createPortal(
                        this.renderBack(),
                        this.dropdownRoot
                    )
                }
            </React.Fragment>
        )
    }
}