import React from 'react';
import ReactDOM from 'react-dom';
// const appRoot = document.getElementById('app-root');
// const modalRoot = document.getElementById('modal-root');
// const root = document.getElementById('root');

class Modal extends React.Component {

    state = {
        tag: 'div',
        classStatus: 'modalAwesome--active',
        classEvent: 'modalAwesome--appearing',
        classStyle: '',
        lock: false,
        scroll: 0,
    }

    constructor(props) {
        super(props);
        this.duration = 500;
        this.modal = React.createRef();

        this.appRoot = document.getElementById('app-root');
        this.modalRoot = document.getElementById('modal-root');
        this.root = document.getElementById('root');
    }

    componentDidMount() {
        const { styleAppear } = this.props;
        this.setState(() => ({
            classStyle: styleAppear
        }));
        // setTimeout(() => {
        //     this.setState(() => ({
        //         classEvent: '',
        //         classStyle: ''
        //     }))
        // }, this.duration);
        this.freeze();
    }

    componentWillUnmount() {
        this.unFreeze();
    }

    back = (url) => {

        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.go(1);
            //window.onpopstate = null;
            this.handleClose();
            console.log('event2');
        };
    }


    eventListener = (event) => {

        //window.history.pushState(null, null, window.location.pathname);
        console.log('event');
        //return false;
        //this.handleClose();

    }

    freeze = () => {
        //window.addEventListener('popstate', this.eventListener, false);

        if(this.modalRoot.children.length) {
            if(this.appRoot.style.top === '') {
                const pos = window.scrollY;
                this.appRoot.style.top = `${-pos}px`;
                this.root.classList.add('modalActive');
                console.log(`freeze`);





            } else {
                console.log(`not freeze`);
            }


        }
        this.back(window.location.href);
        window.scrollTo(0, 0);
    }

    unFreeze = () => {
        //window.removeEventListener('popstate', this.eventListener, false);
        if(this.appRoot.style.top.length) {
            if(this.modalRoot.children.length <= 1) {
                this.root.classList.remove('modalActive');
                const pos = Math.abs(parseInt(this.appRoot.style.top));
                this.appRoot.style.top = '';
                window.scrollTo(0, pos);
                console.log(`unFreeze on ${pos}`);
                window.onpopstate = null;

            }   else {
                this.back(window.location.href);
                console.log(`not unFreeze`);
            }
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
        window.scrollTo(0, 0);
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
                    ref: this.modal
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
            this.modalRoot
        )
    }

}

export default Modal;