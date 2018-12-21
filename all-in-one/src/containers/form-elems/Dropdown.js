import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import cx from 'classnames';

const dropdownRoot = document.getElementById('dropdown-root');

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.frontend = React.createRef();
        this.backend = React.createRef();
    }

    state = {
        dropdownShow: false,
        positionData: null,
        classStatus: '',
        classActive: ''
    }

    static defaultProps = {
        title: 'Dropdown',
        duration: 300,
    }

    componentDidMount() {
        this.setState(() => ({
            positionData: this.frontend.getBoundingClientRect(),
        }))
        window.addEventListener('click', this.click, false);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.click, false);
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

    getPosition = () => {
        const {positionData} = this.state;
        if(!positionData) return false;
        const {height, left, top, width} = positionData;
        return {
            posX: left,
            posY: top + height,
            width
        }
    }

    click = (e) => {
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
        const {className, linkAttr, title} = this.props;
        const {classActive} = this.state;
        return (
            <Button
                {...this.props}
                className={cx(`dropdownAwesome-front`, classActive, className)}
                linkAttr={{
                    ...linkAttr,
                    ref: el => this.setFrontOptions(el)
                }}
            >
                {title}
            </Button>
        )
    }

    renderBack = () => {
        const {posX, posY, width} = this.getPosition();
        const {children, duration} = this.props;
        const {classStatus} = this.state;
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
        const {dropdownShow} = this.state;
        return (
            <React.Fragment>
                {this.renderFront()}
                {
                    dropdownShow && ReactDOM.createPortal(
                        this.renderBack(),
                        dropdownRoot
                    )
                }
            </React.Fragment>
        )
    }
}