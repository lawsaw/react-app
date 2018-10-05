import React from 'react'
import Modal from './Modal'
//import ModalConfirm from './ModalConfirm'

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.modalFormRef = React.createRef();
        this.modalConfirmRef = React.createRef();
    }

    state = {
        confirm: false
    }

    setModalRef = (ref) => {
        if(ref) {
            this.modalFormRef = ref.getWrappedInstance()
        }
    }

    setConfirmRef = (ref) => {
        if(ref) {
            this.modalConfirmRef = ref.getWrappedInstance()
        }
    }

    handleClose = () => {
        this.modalFormRef.handleClose()
    }

    handleShowConfirm = () => {
        this.setState(() => ({
            confirm: true
        }))
    }

    handleCancelConfirm = () => {
        this.setState(() => ({
            confirm: false
        }))
    }

    handleResolve = () => {
        this.modalConfirmRef.handleClose();
        setTimeout(() => {
            this.modalFormRef.handleClose();
            this.props.onResolve();
        },300);

    }

    handleConfirmClose = () => {
        this.modalConfirmRef.handleClose()
    }

    render() {
        const { title, styleAppear, styleDisappear, onClose } = this.props;
        return (
            <React.Fragment>
                <Modal
                    ref={this.setModalRef}
                    title={title}
                    styleAppear={styleAppear}
                    styleDisappear={styleDisappear}
                    onClose={onClose}
                >
                    <div className='modalAwesome-win-body'>
                        {this.props.children}
                    </div>
                    <div className='modalAwesome-win-footer'>
                        <div className="btn-toolbar">
                            <div className="btn-group mr-2">
                                <button onClick={this.handleShowConfirm} className="btn btn-secondary">Отправить</button>
                            </div>
                            <div className="btn-group mr-2">
                                <button onClick={this.handleClose} className="btn btn-secondary">Закрыть</button>
                            </div>
                        </div>
                    </div>
                </Modal>

                {
                    this.state.confirm ? (

                        <Modal
                            ref={this.setConfirmRef}
                            title='Подвердите действие'
                            styleAppear={styleAppear}
                            styleDisappear={styleDisappear}
                            onClose={this.handleCancelConfirm}
                        >
                            <div className='modalAwesome-win-footer'>
                                <div className="btn-toolbar">
                                    <div className="btn-group mr-2">
                                        <button onClick={this.handleResolve} className="btn btn-secondary">Принять</button>
                                    </div>
                                    <div className="btn-group mr-2">
                                        <button onClick={this.handleConfirmClose} className="btn btn-secondary">Отмена</button>
                                    </div>
                                </div>
                            </div>
                        </Modal>


                    ) : null
                }

            </React.Fragment>

        )
    }

}