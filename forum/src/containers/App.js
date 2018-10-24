import React from 'react'
import CustomLink from './CustomLink'
import Home from './Home'
import About from './About'
import Page404 from './Page404'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import ModalConfirm from './ModalConfirm'
import Login from './Login'



export default class extends React.Component {



    render() {
        return (
            <div className="container">
                <Router>
                    <React.Fragment>

                        <div className="headerNav">
                            <div className="d-flex justify-content-between">
                                <ul className="nav nav-tabs nav-pills justify-content-end">
                                    <li className="nav-item">
                                        <CustomLink to="/" className="nav-link" >Главная</CustomLink>
                                    </li>
                                    <li className="nav-item">
                                        <CustomLink to="/about" className="nav-link" >О компании</CustomLink>
                                    </li>
                                </ul>

                                <Login />

                            </div>
                        </div>

                        <div className="work">
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/about" component={About} />
                                <Route path="/:someUrl" render={(props) => <Page404 page={props.match.params.someUrl}/>} />
                            </Switch>
                        </div>




                    </React.Fragment>
                </Router>


            </div>
        )
    }
}
