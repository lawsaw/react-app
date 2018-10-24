import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {addModal, deleteModal} from "../actions/ModalsAction";

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {

    state = {
        classStatus: '',
        classStyle: '',
        lock: false,
    }

    constructor(props) {
        super(props);
        this.duration = 500;
    }

    getLastModal = () => {
        let { modals } = this.props;
        return modals.length ? modals[0].id : 0;
    }

    upgradeStore = () => {
        let lastId = this.getLastModal();
        let newId = lastId+1;
        this.props.addModal(newId);
        modalRoot.setAttribute('counter', newId);
    }

    downgradeStore = () => {
        let lastId = this.getLastModal();
        let newId = lastId-1;
        this.props.deleteModal(lastId);
        modalRoot.setAttribute('counter', newId);
    }

    componentDidMount() {
        const { styleAppear } = this.props;
        this.setState(() => ({
            classStatus: 'modalAwesome--appearing'
        }));
        setTimeout(() => {
            this.setState(() => ({
                classStyle: styleAppear
            }));
            setTimeout(() => {
                this.setState(() => ({
                    classStatus: '',
                    classStyle: ''
                }))
            }, this.duration)
        }, 1);
        this.upgradeStore();
    }

    close = () => {
        if(this.state.lock === true) {
            console.log('wait until it\'s unlocked');
            return false;
        }
        this.setState(()=>({
            lock: true
        }));
        const { styleDisappear } = this.props;
        this.setState(() => ({
            classStatus: 'modalAwesome--disappearing',
            classStyle: styleDisappear,
        }));
        this.downgradeStore();

        // setTimeout(() => {
        //     this.setState(() => ({
        //         classStatus: '',
        //         classStyle: ''
        //     }));
        //     //this.props.handleHide();
        //     handleHideInParent();
        // }, this.duration);
    }

    handleClose = () => {
        this.close();
        setTimeout(() => {
            this.props.onClose();
        }, this.duration);
    }

    template = () => {
        const { title } = this.props;
        const { classStatus, classStyle } = this.state;
        return (
            <div className={`modalAwesome ${classStatus} ${classStyle}`} style={{transitionDuration: `${this.duration/1000}s`}}>
                <div className='modalAwesome-bg' style={{animationDuration: `${this.duration/1000/2}s`}}></div>
                <button onClick={this.handleClose} className='modalAwesome-close'>Close</button>
                <div className='modalAwesome-win' style={{animationDuration: `${this.duration/1000}s`}}>
                    <div className='modalAwesome-win-header'>
                        {title}
                    </div>
                    {this.props.children}
                </div>
            </div>
        )
    }

    render() {
        return ReactDOM.createPortal(
            this.template(),
            modalRoot
        )
    }

}


export default connect(
    store => {
        return {
            modals: store.modals,
        }
    },
    dispatch => {
        return {
            addModal: (id) => dispatch(addModal(id)),
            deleteModal: id => dispatch(deleteModal(id))
        }
    },
    null,
    { withRef: true }
)(Modal)