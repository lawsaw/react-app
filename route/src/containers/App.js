import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import '../styles/style.scss'
import Home from "../pages/Home";
import About from "../pages/About";
import Contacts from "../pages/Contacts";
import Catalog from "../pages/Catalog";
import Protected from "../pages/Protected";
import Login from "../pages/Login";
import CustomLink from './CustomLink'
import PrivateRoute from './PrivateRoute'

export default class extends React.Component {
    state = {
        auth: false,
    }
    logIn = () => {
        this.setState(() => ({
            auth: true
        }))
        console.log('logIn');
    }
    logOut = () => {
        this.setState(() => ({
            auth: false
        }));
        console.log('logOut');
    }
    render() {
        return (
            <div className="container">
                <Router>
                    <React.Fragment>
                        <div className="btn-group">
                            {this.state.auth && <button className="btn btn-secondary" onClick={this.logOut}>Log Out</button>}
                        </div>
                        <ul className="nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                                <CustomLink active={true} to="/" className="nav-link">Home</CustomLink>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">About</Link>
                                <CustomLink to="/about" className="nav-link">About</CustomLink>
                            </li>
                            <li className="nav-item">
                                <Link to="/contacts" className="nav-link">Contacts</Link>
                                <CustomLink to="/contacts" className="nav-link">Contacts</CustomLink>
                            </li>
                            <li className="nav-item">
                                <Link to="/catalog" className="nav-link">Catalog</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/protected" className="nav-link">Protected</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/random-page" className="nav-link">Случайная ссылка</Link>
                            </li>
                        </ul>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            {/*<Redirect from="/about" to="/contacts" />*/}
                            <Route path="/about" component={About} />
                            <Route path="/contacts" component={Contacts} />
                            <Route path="/catalog" component={Catalog} />
                            <Route path="/login" render={(props) => <Login authed={this.state.auth} logIn={this.logIn} logOut={this.logOut} {...props} />} />
                            {/*<Route path="/protected" render={() => <Protected authed={this.state.auth} />} />*/}

                            <PrivateRoute path="/protected" component={Protected} authed={this.state.auth} />

                            <Route path="/:somePage" render={(props) => (<div><h1>404</h1><p>Page {props.match.params.somePage} not found</p></div>)} />
                        </Switch>

                    </React.Fragment>
                </Router>
            </div>
        )
    }
}