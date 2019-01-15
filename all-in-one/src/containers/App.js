import React, { Component } from 'react';
import '../style/index.scss';
import Main from './Main';
import Page404 from './Page404';
import Clock from './Clock';
import Dice from './dice/Dice';
import TicTacToe from './TicTacToe';
import TestModal from './modal/TestModal';
import FormElems from './form-elems/FormElems';

import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/configureStore';


export default class extends Component {

    render() {
        return (
            <React.Fragment>
                <div id="app-root">
                    <Provider store={store}>
                        <BrowserRouter>
                            <React.Fragment>
                                <div className={`wrap`}>
                                    <div className={`container wrap-container`}>
                                        <div className={`row wrap-row`}>
                                            <div className={`col-5 wrap-menu`}>
                                                <ul>
                                                    <li><Link to='/'>Домой</Link></li>
                                                    <li><Link to='/clock'>Часы</Link></li>
                                                    <li><Link to='/dice'>Игральная кость</Link></li>
                                                    <li><Link to='/tic-tac-toe'>Крестики-нолики</Link></li>
                                                    <li><Link to='/modals'>Модалки</Link></li>
                                                    <li><Link to='/form-elems'>Элементы форм</Link></li>
                                                </ul>
                                            </div>
                                            <div className={`col-7 wrap-page`}>
                                                <div className={`page`}>
                                                    <Switch>
                                                        <Route exact path='/' component={Main} />
                                                        <Route path='/clock' component={Clock} />
                                                        <Route path='/dice' component={Dice} />
                                                        <Route path='/tic-tac-toe' component={TicTacToe} />
                                                        <Route path='/modals' component={TestModal} />
                                                        <Route path='/form-elems' component={FormElems} />
                                                        <Route path='/:page/' render={(props) => <Page404 page={props.match.params.page} />} />
                                                    </Switch>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        </BrowserRouter>
                    </Provider>
                </div>
                <div id="modal-root" />
                <div id="dropdown-root" />
            </React.Fragment>
        )
    }
}
