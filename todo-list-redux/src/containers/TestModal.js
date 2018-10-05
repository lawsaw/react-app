import React from 'react'
import ModalInfo from './ModalInfo'
import ModalForm from './ModalForm'


export default class extends React.Component {

    state = {
        modalInfo: false,
        modalForm: false,
    }

    handleModalInfoOpen = () => {
        this.setState(() => ({
            modalInfo: true
        }))
    }

    handleModalInfoClose = () => {
        this.setState(() => ({
            modalInfo: false
        }))
    }

    handleModalFormOpen = () => {
        this.setState(() => ({
            modalForm: true
        }))
    }

    handleModalFormClose = () => {
        this.setState(() => ({
            modalForm: false
        }))
    }

    handleFormResolve = () => {
        console.log('Form resolved');
    }

    handleFormReject = () => {
        console.log('Form rejected');
    }

    render() {
        return (
            <div>
                <button onClick={(e) => {e.preventDefault(); this.handleModalInfoOpen()}}>Open Modal Info</button>
                <button onClick={(e) => {e.preventDefault(); this.handleModalFormOpen()}}>Open Modal Form</button>

                {
                    this.state.modalInfo ? (

                        <ModalInfo
                            title='Добавить задачу fdsfsdf d '
                            styleAppear='modalAwesome--zoomIn'
                            styleDisappear='modalAwesome--toRight'
                            onClose={this.handleModalInfoClose}
                        >
                            info modal
                        </ModalInfo>

                    ) : null
                }

                {
                    this.state.modalForm ? (

                        <ModalForm
                            title='Форма'
                            styleAppear='modalAwesome--zoomIn'
                            styleDisappear='modalAwesome--toRight'
                            onClose={this.handleModalFormClose}
                            onResolve={this.handleFormResolve}
                        >
                            form modal
                        </ModalForm>

                    ) : null
                }

            </div>
        )
    }

}