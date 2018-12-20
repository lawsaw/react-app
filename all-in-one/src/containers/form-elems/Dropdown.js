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

    open = () => {
        const {duration} = this.props;
        const {dropdownShow} = this.state;
        if(dropdownShow === true) {
            console.log('No opening');
            this.close();
            return false
        };
        console.log('opening');
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
        const {dropdownShow} = this.state;
        if(dropdownShow === false) {
            console.log('No closing');
            return false;
        };
        console.log('closing');
        window.removeEventListener('click', this.clickListener, false);
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

    componentDidMount() {
        this.setState(() => ({
            positionData: this.frontend.getBoundingClientRect(),
        }))
    }

    clickListener = (e) => {
        if(e.target !== this.backend || this.isDescendant(this.backend, e.target)) {
            console.log('target is the same');
            return false
        };
        console.log('target is NOT the same');
        this.close();
    }

    setBackOpt = (element) => {
        if(!element) return false;
        const {duration} = this.props;
        this.backend = element;
        setTimeout(() => {
            window.addEventListener('click', this.clickListener, false);
        }, duration)

    }

    isDescendant = (parent, child) => {
        var node = child.parentNode;
        while (node != null) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
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
                    ref: el => (this.frontend = el)
                }}
                onClick={this.open}
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
                    left: `${posX}px`,
                    top: `${posY}px`,
                    minWidth: `${width}px`,
                    animationDuration: `${duration/1000}s`
                }}
                ref={(el) => this.setBackOpt(el)}
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