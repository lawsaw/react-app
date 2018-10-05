import React from 'react'
import Modal from './Modal'

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
    }

    setRef = (ref) => {
        if(ref) {
            this.modalRef = ref.getWrappedInstance()
        }
    }

    handleClose = () => {
        this.modalRef.handleClose()
    }

    render() {
        const { title, styleAppear, styleDisappear, onClose } = this.props;
        return (
            <Modal
                ref={this.setRef}
                title={title}
                styleAppear={styleAppear}
                styleDisappear={styleDisappear}
                onClose={onClose}
            >
                <div className="modalAwesome-win-body">
                    {this.props.children}
                    <button onClick={this.handleClose} className="btn btn-secondary">Закрыть</button>
                </div>

            </Modal>
        )
    }

}