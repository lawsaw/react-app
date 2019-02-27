import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { isCompositeTypeElement } from "../../helpers";

const lodash = require('lodash');

const ARROW_SIZE = 10;

export default class extends React.Component {

    static defaultProps = {
        front: 'Tooltip_front',
        classNameFront: [],
        classNameBack: [],
        duration: 300,
        event: 'click',
    }

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            position: 'top',
            left: 0,
            top: 0,
            duration: 0,
        };
        this.frontend = this.renderFront();
    }

    componentDidMount() {
        const { event } = this.props;
        this.root = document.getElementById('tooltip-root');
        window.addEventListener(event, this.trigger, false);
    }

    componentWillUnmount() {
        const { event } = this.props;
        window.removeEventListener(event, this.trigger, false);
    }

    componentDidUpdate(np, st) {
        if(!lodash.isEqual(st, this.state)) {
            if(this.state.active) {
                this.setPosition();
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

    setPosition = () => {
        const { left, top, position } = this.getPosition();
        this.setState(() => ({
            left, top, position
        }));
    }

    getPosition = () => {
        const frontRect = this.frontendRef.getBoundingClientRect();
        const backRect = this.backendRef.getBoundingClientRect();
        const clientLeft = 0,
              clientTop = 0,
              clientRight = window.innerWidth,
              clientBottom = window.innerHeight;
        const topLeftPointsCoords = this.getTopLeftPointsCoords(frontRect, backRect);
        for(let position in topLeftPointsCoords) {
            let rectangle = this.getRectangle(position, frontRect, backRect);
            if( (rectangle['topLeft'].left >= clientLeft && rectangle['bottomRight'].left <= clientRight) &&
                (rectangle['topLeft'].top >= clientTop && rectangle['bottomRight'].top <= clientBottom)
            ) {
                return {
                    left: topLeftPointsCoords[position].left,
                    top: topLeftPointsCoords[position].top,
                    position
                };
            }
        }
        const defaultPosition = 'top';
        return {
            left: topLeftPointsCoords[defaultPosition].left,
            top: topLeftPointsCoords[defaultPosition].top,
            position: defaultPosition
        };
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
        const triggeredElement = e.target;
        if(triggeredElement === this.backendRef || this.isDescendant(this.backendRef, triggeredElement)) {
            //console.log('backend');
        } else if(triggeredElement === this.frontendRef || this.isDescendant(this.frontendRef, triggeredElement)) {
            if(active) {
                //console.log('frontend & active');
            } else {
                //console.log('frontend & NOT active');
                this.open();
            }
        } else {
            if(active) {
                this.close();
            }
        }
    }

    open = () => {
        this.setState(() => ({
            active: true
        }));
        this.setPosition();
        setTimeout(() => {
            this.setState(() => ({
                duration: this.props.duration
            }));
        }, this.props.duration);
        window.addEventListener('resize', this.setPosition, false);
        window.addEventListener('scroll', this.setPosition, false);
    }

    close = () => {
        window.removeEventListener('resize', this.setPosition, false);
        window.removeEventListener('scroll', this.setPosition, false);
        this.setState(() => ({
            active: false,
            duration: 0
        }));
    }

    renderFront = () => {
        const { active } = this.state;
        const { front, classNameFront } = this.props;
        const options = isCompositeTypeElement(front) ? {
                type: front.type,
                key: 'Ref',
                front: front.props.children,
                className: ['tooltipFront--composite'],
            } : {
                type: 'span',
                key: 'ref',
                front: front,
                className: ['tooltipFront--primitive'],
            };
        return React.createElement(
            options.type,
            {
                ...front.props,
                [options.key]: el => this.frontendRef = el,
                className: cx(`tooltipFront`, classNameFront, options.className, active && `tooltipFront--active`)
            },
            options.front
        )
    }

    renderBack = () => {
        const { active, position, left, top, duration } = this.state;
        const { children: back, classNameBack } = this.props;
        return React.createElement(
            'div',
            {
                ...back.props,
                style: {
                    left: `${left}px`,
                    top: `${top}px`,
                    transitionDuration: `${duration/1000}s`,
                },
                ref: el => this.backendRef = el,
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
                <div
                    className={cx(`tooltipBack-arrow`)}
                    style={{
                        transitionDuration: `${duration/1000}s`,
                    }}
                ></div>
                {back}
            </React.Fragment>
        );
    }

    render() {
        const { active } = this.state;
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