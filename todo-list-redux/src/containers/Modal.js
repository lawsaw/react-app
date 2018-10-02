import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import {addModal, deleteModal} from "../actions/ModalsAction";


class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.modal = this.createModalContainer();
        this.modalRoot = document.getElementById('modal-root');
        this.delay = 750;
    }

    getMaxModalId = () => {
        const { modals:list } = this.props;
        return Math.max.apply(null, list.map((modal) => (
            modal.id
        )))
    }

    createModalContainer = () => {
        this.modal = document.createElement('div');
        this.modal.classList.add('modalAwesome');

        let maxId = this.getMaxModalId();
        let newId = ++maxId;

        this.modal.setAttribute('id', newId);
        this.props.addModal(newId);

        console.log(this.props.modals);
        console.log(this.getMaxModalId());
        console.log(this.modal);

        return this.modal;
    }

    componentDidMount() {
        const { styleAppear } = this.props;
        const statusAppear = 'modalAwesome--appearing';

        this.modal.classList.add(statusAppear);
        this.modalRoot.insertBefore(this.modal, this.modalRoot.firstChild);

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1)
        });

        promise
            .then(
                () => {
                    this.modal.classList.add(styleAppear);
                    setTimeout(() => {
                        this.modal.classList.remove(statusAppear, styleAppear);
                    }, this.delay)
                }
            )
    }

    closeModal = () => {

        const { styleDisappear } = this.props;
        const statusDisappear = 'modalAwesome--disappearing';
        this.modal.classList.add(statusDisappear);
        this.modal.classList.add(styleDisappear);

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                this.modalRoot.removeChild(this.modal);
                resolve();
            }, this.delay);
        });

        promise
            .then(
                () => {
                    this.props.handleHide();
                    let maxId = this.getMaxModalId();
                    this.props.deleteModal(maxId);
                }
            )
    }

    modalTemplate = () => {
        const { title } = this.props;
        return (
            <React.Fragment>
                <div className='modalAwesome-bg' style={{animationDuration: `${this.delay/1000/2}s`}}></div>
                <button onClick={this.closeModal} className='modalAwesome-close'>Close</button>
                <div className='modalAwesome-win' style={{transitionDuration: `${this.delay/1000}s`}}>
                    <div className='modalAwesome-win-header'>
                        {title}
                    </div>
                    <div className='modalAwesome-win-body'>
                        {this.props.children}
                    </div>
                </div>
            </React.Fragment>
        )
    }

    render() {

        return ReactDOM.createPortal(
            this.modalTemplate(),
            this.modal
        )
    }



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
    }
)(Modal)