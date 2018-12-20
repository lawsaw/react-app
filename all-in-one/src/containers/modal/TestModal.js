import React from 'react'
import ModalInfo from './ModalInfo'
import ModalForm from './ModalForm'
import ModalConfirm from './ModalConfirm'


export default class extends React.Component {

    state = {
        modalInfo: false,
        modalForm: false,
        modalConfirm: false,

        modalCascade1: false,
        modalCascade2: false,
        modalCascade3: false,
        modalCascade4: false,
        modalCascade5: false,

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

    handleModalConfirmOpen = () => {
        this.setState(() => ({
            modalConfirm: true
        }))
    }

    handleModalConfirmClose = () => {
        this.setState(() => ({
            modalConfirm: false
        }))
    }

    handleFormResolve = () => {
        console.log('Form resolved');
    }

    handleFormReject = () => {
        console.log('Form rejected');
    }

    handleConfirmResolve = () => {
        console.log('Confirm resolved');
    }

    handleConfirmReject = () => {
        console.log('Confirm rejected');
    }






    handleModalCascadeOpen = (key) => {
        this.setState(() => ({
            [key]: true
        }))
    }

    handleModalCascadeClose = (key) => {
        this.setState(() => ({
            [key]: false
        }))
    }




    render() {
        return (
            <div>

                <h1>Модалки</h1>

                <button onClick={(e) => {e.preventDefault(); this.handleModalInfoOpen()}}>Open Modal Info</button>
                <button onClick={(e) => {e.preventDefault(); this.handleModalFormOpen()}}>Open Modal Form</button>
                <button onClick={(e) => {e.preventDefault(); this.handleModalConfirmOpen()}}>Open Modal Confirm</button>
                <button onClick={() => {this.handleModalCascadeOpen('modalCascade1')}}>Open Modal Cascade 1</button>

                {
                    this.state.modalInfo ? (

                        <ModalInfo
                            title='Добавить задачу'
                            styleAppear='modalAwesome--fromZoomIn'
                            styleDisappear='modalAwesome--toZoomOut'
                            onClose={this.handleModalInfoClose}
                        >
                            info modal
                        </ModalInfo>

                    ) : null
                }

                {
                    this.state.modalForm ? (

                        <ModalForm
                            title='Form'
                            styleAppear='modalAwesome--fromLeft'
                            styleDisappear='modalAwesome--toRight'
                            onClose={this.handleModalFormClose}
                            onResolve={this.handleFormResolve}
                            onReject={this.handleFormReject}
                        >
                            form modal
                        </ModalForm>

                    ) : null
                }

                {
                    this.state.modalConfirm ? (

                        <ModalConfirm
                            title='Confirm'
                            styleAppear='modalAwesome--fromUp'
                            styleDisappear='modalAwesome--toDown'
                            onClose={this.handleModalConfirmClose}
                            onResolve={this.handleConfirmResolve}
                            onReject={this.handleConfirmReject}
                        >
                        </ModalConfirm>

                    ) : null
                }


                {
                    this.state.modalCascade1 ? (

                        <ModalInfo
                            title='modalCascade1'
                            styleAppear='modalAwesome--fromZoomIn'
                            styleDisappear='modalAwesome--toZoomOut'
                            onClose={() => {this.handleModalCascadeClose('modalCascade1')}}
                        >
                            modalCascade1
                            <button onClick={() => {this.handleModalCascadeOpen('modalCascade2')}}>Open Modal Cascade 2</button>

                            {
                                this.state.modalCascade2 ? (

                                    <ModalInfo
                                        title='modalCascade2'
                                        styleAppear='modalAwesome--fromLeft'
                                        styleDisappear='modalAwesome--toRight'
                                        onClose={() => {this.handleModalCascadeClose('modalCascade2')}}
                                    >
                                        modalCascade2
                                        <button onClick={() => {this.handleModalCascadeOpen('modalCascade3')}}>Open Modal Cascade 3</button>

                                        {
                                            this.state.modalCascade3 ? (

                                                <ModalInfo
                                                    title='modalCascade3'
                                                    styleAppear='modalAwesome--fromUp'
                                                    styleDisappear='modalAwesome--toDown'
                                                    onClose={() => {this.handleModalCascadeClose('modalCascade3')}}
                                                >
                                                    modalCascade3
                                                    <button onClick={() => {this.handleModalCascadeOpen('modalCascade4')}}>Open Modal Cascade 4</button>

                                                    {
                                                        this.state.modalCascade4 ? (

                                                            <ModalInfo
                                                                title='modalCascade4'
                                                                styleAppear='modalAwesome--fromRight'
                                                                styleDisappear='modalAwesome--toUp'
                                                                onClose={() => {this.handleModalCascadeClose('modalCascade4')}}
                                                            >
                                                                modalCascade4
                                                                <button onClick={() => {this.handleModalCascadeOpen('modalCascade5')}}>Open Modal Cascade 5</button>

                                                                {
                                                                    this.state.modalCascade5 ? (

                                                                        <ModalInfo
                                                                            title='modalCascade5'
                                                                            styleAppear='modalAwesome--fromDown'
                                                                            styleDisappear='modalAwesome--toLeft'
                                                                            onClose={() => {this.handleModalCascadeClose('modalCascade5')}}
                                                                        >
                                                                            modalCascade5
                                                                        </ModalInfo>

                                                                    ) : null
                                                                }

                                                            </ModalInfo>

                                                        ) : null
                                                    }

                                                </ModalInfo>

                                            ) : null
                                        }

                                    </ModalInfo>

                                ) : null
                            }

                        </ModalInfo>

                    ) : null
                }

            </div>
        )
    }

}