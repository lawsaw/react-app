import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { isCompositeTypeElement } from "../../helpers";

const lodash = require('lodash');


const ARROW_SIZE = 20;

export default class extends React.Component {

    static defaultProps = {
        position: 'top',
        front: 'Tooltip_front',
        classNameFront: [],
        classNameBack: [],
        event: 'click',
    }

    constructor(props) {
        super(props);
        // this.frontendRef = React.createRef();
        // this.backendRef = React.createRef();
        this.state = {
            active: false,
            position: this.props.position,

        };
        this.frontend = this.renderFront();
        this.backend = this.renderBack();
    }

    componentDidMount() {
        const { event } = this.props;
        this.root = document.getElementById('tooltip-root');
        window.addEventListener(event, this.trigger, false);
        // window.addEventListener('resize', this.setPositionWithRule, false);
        // window.addEventListener('scroll', this.setPositionWithRule, false);
       //
        //this.setPosition();
        // const { left, top } = this.frontendRef.getBoundingClientRect();
        // this.setState(() => ({
        //     top,
        //     left
        // }))
        console.log(this.state.left);
        console.log(this.backendRef);

    }

    componentWillUnmount() {
        const { event } = this.props;
        window.removeEventListener(event, this.trigger, false);
        // window.removeEventListener('resize', this.setPositionWithRule, false);
        // window.removeEventListener('scroll', this.setPositionWithRule, false);
    }

    componentDidUpdate(np, st) {
        if(!lodash.eq(np, this.props)) {
            console.log('componentDidUpdate props');
        }
        if(!lodash.eq(st, this.state)) {
            console.log('componentDidUpdate state');
        }
    }

    componentWillReceiveProps(np) {
        console.log('componentWillReceiveProps');
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

    setStartPosition = () => {
        const frontRect = this.frontendRef.getBoundingClientRect();

    }

    setPosition = () => {
        const { left, top, position } = this.getPosition();
        this.setState(() => ({
            left, top, position
        }));
    }

    setPositionWithRule = () => {
        if(this.state.active) {
            this.setPosition();
        }
    }

    getPosition = () => {
        const frontRect = this.frontendRef.getBoundingClientRect();
        const backRect = this.backendRef.getBoundingClientRect();
        const clientLeft = 0,
              clientTop = 0,
              clientRight = window.innerWidth,
              clientBottom = window.innerHeight;
        const topLeftPointsCoords = this.getTopLeftPointsCoords(frontRect, backRect);
        let coords = {};
        for(let position in topLeftPointsCoords) {
            let rectangle = this.getRectangle(position, frontRect, backRect);
            if( (rectangle['topLeft'].left >= clientLeft && rectangle['bottomRight'].left <= clientRight) &&
                (rectangle['topLeft'].top >= clientTop && rectangle['bottomRight'].top <= clientBottom)
            ) {
                coords = {
                    left: topLeftPointsCoords[position].left,
                    top: topLeftPointsCoords[position].top,
                    position
                };
                break;
            }
        }
        // let item = 'rightTop';
        // coords = {
        //     left: topLeftPointsCoords[item].left,
        //     top: topLeftPointsCoords[item].top,
        //     position: item
        // };,
        return coords;
    }

    getTopLeftPointsCoords = (frontend, backend) => ({
        top: {
            left: frontend.left + frontend.width / 2 - backend.width / 2,
            top: frontend.top - backend.height - ARROW_SIZE,
        },
        bottom: {
            left: frontend.left + frontend.width / 2 - backend.width / 2,
            top: frontend.top + frontend.height + ARROW_SIZE,
        },
        left: {
            left: frontend.left - backend.width - ARROW_SIZE,
            top: frontend.top + frontend.height / 2 - backend.height / 2,
        },
        right: {
            left: frontend.left + frontend.width + ARROW_SIZE,
            top: frontend.top + frontend.height / 2 - backend.height / 2,
        },
        topLeft: {
            left: frontend.left - backend.width + frontend.width,
            top: frontend.top - backend.height - ARROW_SIZE,
        },
        topRight: {
            left: frontend.left,
            top: frontend.top - backend.height - ARROW_SIZE,
        },
        bottomLeft: {
            left: frontend.left - backend.width + frontend.width,
            top: frontend.top + frontend.height + ARROW_SIZE,
        },
        bottomRight: {
            left: frontend.left,
            top: frontend.top + frontend.height + ARROW_SIZE,
        },
        leftTop: {
            left: frontend.left - backend.width - ARROW_SIZE,
            top: frontend.top + frontend.height - backend.height + ARROW_SIZE / 2,
        },
        leftBottom: {
            left: frontend.left - backend.width - ARROW_SIZE,
            top: frontend.top - ARROW_SIZE / 2,
        },
        rightTop: {
            left: frontend.left + frontend.width + ARROW_SIZE,
            top: frontend.top - ARROW_SIZE / 2,
        },
        rightBottom: {
            left: frontend.left + frontend.width + ARROW_SIZE,
            top: frontend.top + frontend.height - backend.height + ARROW_SIZE / 2,
        },
    });

    getRectangle = (position, frontend, backend) => {
        const coords = this.getTopLeftPointsCoords(frontend, backend);
        return {
            topLeft: {
                left: coords[position].left,
                top: coords[position].top,
            },
            topRight: {
                left: coords[position].left + backend.width,
                top: coords[position].top,
            },
            bottomRight: {
                left: coords[position].left + backend.width,
                top: coords[position].top + backend.height,
            },
            bottomLeft: {
                left: coords[position].left,
                top: coords[position].top + backend.height,
            }
        }
    }

    trigger = (e) => {
        const { active } = this.state;
        const clickedElement = e.target;
        if(clickedElement === this.backendRef || this.isDescendant(this.backendRef, clickedElement)) {
            //console.log('backend');
        } else if(clickedElement === this.frontendRef || this.isDescendant(this.frontendRef, clickedElement)) {
            if(active) {
                //console.log('frontend & active');
            } else {
                //console.log('frontend & NOT active');
                this.open();
            }
        } else {
            this.close();
        }
    }

    open = () => {
        this.setState(() => ({
            active: true
        }));
        this.setPositionWithRule();
    }

    close = () => {
        this.setState(() => ({
            active: false
        }))
    }

    setFrontOptions = (frontElement) => {
        if(frontElement) {
            this.frontendRef = frontElement;
        }
    }

    setBackOptions = (backElement) => {
        if(backElement) {
            this.backendRef = backElement;
        }
    }

    renderFront = () => {
        const { active } = this.state;
        const { front, classNameFront } = this.props;
        const options = isCompositeTypeElement(front) ? {
                type: front.type,
                key: 'Ref',
                front: front.props.children,
            } : {
                type: 'span',
                key: 'ref',
                front: front,
            };
        return React.createElement(
            options.type,
            {
                ...front.props,
                [options.key]: el => this.setFrontOptions(el),
                className: cx(`tooltipFront`, classNameFront, active && `tooltipFront--active`)
            },
            options.front
        )
    }

    renderBack = () => {
        const { active, position, left, top } = this.state;
        const { children: back, classNameBack } = this.props;
        return React.createElement(
            'div',
            {
                ...back.props,
                style: {
                    left: `${left}px`,
                    top: `${top}px`,
                },
                ref: el => this.setBackOptions(el),
                className: cx(`tooltipBack`, classNameBack, active && `tooltipBack--active`, `tooltipBack--${position}`)
            },
            <React.Fragment>
                <div
                    className={`tooltipBack-toolbar`}
                >
                    <button
                        onClick={this.close}
                    >Close</button>
                </div>
                <div className={cx(`tooltipBack-arrow`)}></div>
                {back}
            </React.Fragment>
        );
    }

    updateBackPosition = () => {

    }

    render() {
        const { active } = this.state;
        console.log('render');
        const backend = this.renderBack();
        return (
            <React.Fragment>
                {this.frontend}
                {
                    active && ReactDOM.createPortal(
                        backend,
                        this.root
                    )
                }
            </React.Fragment>
        )
    }
}