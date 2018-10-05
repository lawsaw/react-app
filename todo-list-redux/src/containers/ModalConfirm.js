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

    handleResolve = () => {
        this.props.onResolve()
    }

    handleReject = () => {
        this.props.onReject()
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
                <div className='modalAwesome-win-footer'>
                    <div className="btn-toolbar">
                        <div className="btn-group mr-2">
                            <button onClick={this.handleResolve} className="btn btn-secondary">Принять</button>
                        </div>
                        <div className="btn-group mr-2">
                            <button onClick={this.handleReject} className="btn btn-secondary">Отмена</button>
                        </div>
                    </div>
                </div>

            </Modal>
        )
    }

}