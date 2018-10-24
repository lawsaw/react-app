import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default class extends React.Component {
    render() {
        const {component: Component, authed, ...rest} = this.props;
        console.log(this.props);
        return (
            <Route
                {...rest}
                render={props => (
                    (authed) ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }} />
                    )
                )}
            />
        )
    }
}