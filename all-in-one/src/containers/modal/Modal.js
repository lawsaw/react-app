import React from 'react';
import ReactDOM from 'react-dom';
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');
const root = document.getElementById('root');

class Modal extends React.Component {

    state = {
        tag: 'div',
        classStatus: 'modalAwesome--active',
        classEvent: 'modalAwesome--appearing',
        classStyle: '',
        lock: false,
    }

    constructor(props) {
        super(props);
        this.duration = 500;
    }

    componentDidMount() {
        const { styleAppear } = this.props;
        this.setState(() => ({
            classStyle: styleAppear
        }));
        setTimeout(() => {
            this.setState(() => ({
                classEvent: '',
                classStyle: ''
            }))
        }, this.duration);

        if(modalRoot.children.length > 0) {
            root.classList.add('modalActive');
        }
    }

    getWindowScrollTop = () => {

    }

    componentWillUnmount() {
        if(modalRoot.children.length <= 1) {
            root.classList.remove('modalActive');
        }
    }

    close = () => {
        const { lock } = this.state;
        if(lock) {
            console.log('wait until it\'s unlocked');
            return false;
        }
        const { styleDisappear } = this.props;
        this.setState(() => ({
            lock: true,
            classStatus: '',
            classEvent: 'modalAwesome--disappearing',
            classStyle: styleDisappear,
            tag: 'span'
        }));
    }

    handleClose = () => {
        const { onClose } = this.props;
        this.close();
        setTimeout(() => {
            onClose();
        }, this.duration);
    }

    template = () => {
        const { title } = this.props;
        const { classEvent, classStyle, classStatus, tag } = this.state;
        return (
            React.createElement(
                tag,
                {
                    className: `modalAwesome ${classStatus} ${classEvent} ${classStyle}`,
                    style: {transitionDuration: `${this.duration/1000}s`},
                },
                (
                    <React.Fragment>
                        <div
                            className='modalAwesome-bg'
                            style={{animationDuration: `${this.duration/1000/2}s`}}
                        >
                        </div>
                        <button
                            onClick={this.handleClose}
                            className='modalAwesome-close'
                        >
                            Close
                        </button>
                        <div
                            className='modalAwesome-win'
                            style={{animationDuration: `${this.duration/1000}s`}}
                        >
                            <div className='modalAwesome-win-header'>
                                {title}
                            </div>
                            {this.props.children}
                        </div>
                    </React.Fragment>
                )
            )

        )
    }

    render() {
        return ReactDOM.createPortal(
            this.template(),
            modalRoot
        )
    }

}

export default Modal;