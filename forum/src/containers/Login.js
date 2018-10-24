import React from 'react'
import ModalConfirm from "./ModalConfirm"
import { connect } from 'react-redux'
import { logIn, logOut } from "../actions/AuthAction"
import { setCookie, deleteCookie, getCookie } from '../utils/helpers'

class Login extends React.Component {

    state = {
        modalLogin: false,
        modalLogout: false,
        loginName: ''
    }

    login = () => {
        this.props.logIn(this.state.loginName);
        // console.log(this.state.loginName);
        //console.log(this.props.auth);
        return true;
    }

    logout = () => {
        this.props.logOut(null);
        // console.log(this.state.loginName);
        //console.log(this.props.auth);
        return true;
    }

    handleLoginChange = (e) => {
        let value = e.currentTarget.value;
        this.setState(() => ({
            loginName: value
        }));
    }

    handleLoginModal = () => {
        this.setState(() => ({
            modalLogin: !this.state.modalLogin
        }));
    }

    handleLogoutModal = () => {
        this.setState(() => ({
            modalLogout: !this.state.modalLogout
        }));
    }

    render() {
        return (
            <React.Fragment>

                {
                    this.props.auth.user ? (
                        <button onClick={this.handleLogoutModal} type="button" className="btn btn-info">Выход ({this.props.auth.user})</button>
                    ) : (
                        <button onClick={this.handleLoginModal} type="button" className="btn btn-info">Вход</button>
                    )
                }

                {
                    this.state.modalLogin ? (

                        <ModalConfirm
                            title='Авторизация'
                            styleAppear='modalAwesome--fromZoomOut'
                            styleDisappear='modalAwesome--toZoomIn'
                            onClose={this.handleLoginModal}
                            onResolve={this.login}
                            onReject={(action) => {}}
                        >
                            <div>
                                <div className="form-group">
                                    <label>Login</label>
                                    <input onChange={this.handleLoginChange} value={this.state.loginName} type="text" className="form-control" />
                                    <small className="form-text text-muted">Введите свой Login</small>
                                </div>
                            </div>
                        </ModalConfirm>

                    ) : null
                }

                {
                    this.state.modalLogout ? (

                        <ModalConfirm
                            title='Вы уверены, что хотите выйти?'
                            styleAppear='modalAwesome--fromZoomOut'
                            styleDisappear='modalAwesome--toZoomIn'
                            onClose={this.handleLogoutModal}
                            onResolve={this.logout}
                            onReject={(action) => {}}
                        >
                        </ModalConfirm>

                    ) : null
                }

            </React.Fragment>
        )
    }
}

export default connect(
    store => {
        return {
            users: store.users,
            auth: store.auth,
        }
    },
    dispatch => {
        return {
            logIn: (name) => {setCookie('user', name); dispatch(logIn(name))},
            logOut: (name) => {deleteCookie('user'); dispatch(logOut(name))},
        }
    },
    null,
    { withRef: true }
)(Login)