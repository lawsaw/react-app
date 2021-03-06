import React from 'react'
import Modal from './Modal'
import ModalConfirm from './ModalConfirm'

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.modalFormRef = React.createRef();
        this.modalConfirmRef = React.createRef();
        this.labelResolve = this.props.labelResolve ? this.props.labelResolve : 'Отправить';
        this.labelReject = this.props.labelReject ? this.props.labelReject : 'Закрыть';
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
        if(this.props.onResolveValidate) {
            if(!this.props.onResolveValidate()) {
                return false;
            }
        }

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

    handleReject = () => {
        this.modalConfirmRef.handleClose();
        this.props.onReject();
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
                                <button onClick={this.handleShowConfirm} className="btn btn-secondary">{this.labelResolve}</button>
                            </div>
                            <div className="btn-group mr-2">
                                <button onClick={this.handleClose} className="btn btn-secondary">{this.labelReject}</button>
                            </div>
                        </div>
                    </div>
                </Modal>

                {
                    this.state.confirm ? (

                            <ModalConfirm
                                refs={this.setConfirmRef}
                                title='Подвердите действие'
                                styleAppear={styleAppear}
                                styleDisappear={styleDisappear}
                                onClose={this.handleCancelConfirm}
                                onResolve={this.handleResolve}
                                onReject={this.handleReject}
                            >
                                {this.props.confirmContent}
                            </ModalConfirm>

                    ) : null
                }

            </React.Fragment>

        )
    }

}