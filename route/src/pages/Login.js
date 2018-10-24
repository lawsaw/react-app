import React from 'react'
import {Redirect} from "react-router-dom";

export default class extends React.Component {

    valid = (path) => {
        let arr = path.split('.');
        let rest = arr.slice(1);
        let obj = arr[0];
        let next = '';
        let last = '';
        for(let i in rest) {
            if(!eval(obj)) return false;
            next = `${next}${next.length ? '.' : ''}${rest[i]}`;
            last = `${obj}.${next}`;
            if(!eval(last)) return false;
        }
        return eval(last);
    }

    render() {
        if(this.props.authed) {
            let key = this.valid('this.props.location.state.from');
            return key ? (
                <Redirect to={key} />
            ) : (
                <div>You are now logged in!</div>
            )
        }
        return (
            <div>
                <h1>Login</h1>
                <p>Please, log in to see the protected page!</p>
                <p>
                    <button onClick={this.props.logIn}>Log In</button>
                </p>
            </div>
        )
    }
}