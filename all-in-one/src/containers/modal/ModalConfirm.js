import React from 'react'
import Modal from './Modal'

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    setRef = (ref) => {
        if(ref) {
            this.ref = ref
        }
    }

    handleResolve = () => {
        if(this.props.refs) {
            // This happens in case of Confirm modal inserted into the FormModal
            this.props.onResolve();
            return true;
        }
        // This happens in case of single Confirm modal from root
        this.ref.handleClose();
        this.props.onResolve();

    }

    handleReject = () => {
        if(this.props.refs) {
            // This happens in case of Confirm modal inserted into the FormModal
            this.props.onReject();
            return true;
        }
        // This happens in case of single Confirm modal from root
        this.ref.handleClose();
        this.props.onReject();
    }

    render() {
        const { title, styleAppear, styleDisappear, onClose } = this.props;
        const refs = this.props.refs ? this.props.refs : this.setRef;
        return (
            <Modal
                ref={refs}
                title={title}
                styleAppear={styleAppear}
                styleDisappear={styleDisappear}
                onClose={onClose}
            >
                {
                    this.props.children ? (
                        <div className="modalAwesome-win-body">
                            {this.props.children}
                        </div>
                    ) : null
                }
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