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

    test = () => {
        alert(556566);
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

    close = (handleHideInParent) => {
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
        setTimeout(() => {
            this.setState(() => ({
                classStatus: '',
                classStyle: ''
            }));
            //this.props.handleHide();
            handleHideInParent();
        }, this.duration);
    }





    handleResolve = () => {
        this.props.onResolve(this.close);
    }

    handleReject = () => {
        this.props.onReject(this.close);
    }




    template = () => {
        const { title } = this.props;
        const { classStatus, classStyle } = this.state;
        return (
            <div className={`modalAwesome ${classStatus} ${classStyle}`} style={{transitionDuration: `${this.duration/1000}s`}}>
                <div className='modalAwesome-bg' style={{animationDuration: `${this.duration/1000/2}s`}}></div>

                <button
                    onClick={this.handleReject}
                    className='modalAwesome-close'
                >Close</button>

                <div className='modalAwesome-win' style={{transitionDuration: `${this.duration/1000}s`}}>
                    <div className='modalAwesome-win-header'>
                        {title}
                    </div>
                    <div className='modalAwesome-win-body'>
                        {this.props.children}
                    </div>
                    <div className='modalAwesome-win-footer'>
                        <div className="btn-toolbar">
                            <div className="btn-group mr-2">
                                <button onClick={this.handleResolve} className="btn btn-secondary">Resolve</button>
                            </div>
                            <div className="btn-group mr-2">
                                <button onClick={this.handleReject} className="btn btn-secondary">Reject</button>
                            </div>
                        </div>
                    </div>
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



    // constructor(props) {
    //     super(props);
    //     this.modal = this.createModalContainer();
    //     this.modalRoot = document.getElementById('modal-root');
    //     this.delay = 1000;
    // }
    //
    // getMaxModalId = () => {
    //     const { modals:list } = this.props;
    //     return Math.max.apply(null, list.map((modal) => (
    //         modal.id
    //     )))
    // }
    //
    // createModalContainer = () => {
    //     this.modal = document.createElement('div');
    //     this.modal.classList.add('modalAwesome');
    //     let maxId = this.getMaxModalId();
    //     let newId = ++maxId;
    //
    //     this.modal.setAttribute('id', newId);
    //     this.props.addModal(newId);
    //
    //     console.log(this.props.modals);
    //     console.log(this.getMaxModalId());
    //     console.log(this.modal);
    //
    //     return this.modal;
    // }
    //
    // componentDidMount() {
    //     const { styleAppear } = this.props;
    //     const statusAppear = 'modalAwesome--appearing';
    //
    //     this.modal.style.transitionDuration = `${this.delay/1000}s`;
    //
    //     this.modal.classList.add(statusAppear);
    //     this.modalRoot.insertBefore(this.modal, this.modalRoot.firstChild);
    //
    //     const promise = new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve();
    //         }, 1)
    //     });
    //
    //     promise
    //         .then(
    //             () => {
    //                 this.modal.classList.add(styleAppear);
    //                 setTimeout(() => {
    //                     this.modal.classList.remove(statusAppear, styleAppear);
    //                 }, this.delay)
    //             }
    //         )
    // }
    //
    // closeModal = () => {
    //
    //     const { styleDisappear } = this.props;
    //     const statusDisappear = 'modalAwesome--disappearing';
    //     this.modal.classList.add(statusDisappear);
    //     this.modal.classList.add(styleDisappear);
    //
    //     const promise = new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             this.modalRoot.removeChild(this.modal);
    //             resolve();
    //         }, this.delay);
    //     });
    //
    //     promise
    //         .then(
    //             () => {
    //                 this.props.handleHide();
    //                 let maxId = this.getMaxModalId();
    //                 this.props.deleteModal(maxId);
    //             }
    //         )
    // }
    //
    // modalTemplate = () => {
    //     const { title } = this.props;
    //     return (
    //         <React.Fragment>
    //             <div className='modalAwesome-bg' style={{animationDuration: `${this.delay/1000/2}s`}}></div>
    //             <button onClick={this.closeModal} className='modalAwesome-close'>Close</button>
    //             <div className='modalAwesome-win' style={{transitionDuration: `${this.delay/1000}s`}}>
    //                 <div className='modalAwesome-win-header'>
    //                     {title}
    //                 </div>
    //                 <div className='modalAwesome-win-body'>
    //                     {this.props.children}
    //                 </div>
    //             </div>
    //         </React.Fragment>
    //     )
    // }
    //
    // render() {
    //
    //     return ReactDOM.createPortal(
    //         this.modalTemplate(),
    //         this.modal
    //     )
    // }










    // handleHide = () => {
    //
    // }
    //
    // modalTemplate = () => {
    //     const { title } = this.props;
    //     return (
    //         <div className='modalAwesome'>
    //             <div className='modalAwesome-bg'></div>
    //             <button onClick={this.handleHide} className='modalAwesome-close'>Close</button>
    //             <div className='modalAwesome-win'>
    //                 <div className='modalAwesome-win-header'>
    //                     {title}
    //                 </div>
    //                 <div className='modalAwesome-win-body'>
    //                     {this.props.children}
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
    //
    // render() {
    //     return ReactDOM.createPortal(
    //         this.modalTemplate(),
    //         document.getElementById('modal-root')
    //     )
    // }

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