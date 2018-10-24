import React from 'react'
import { Link, Route } from 'react-router-dom'

export default class extends React.Component {
    render() {
        const { to, className } = this.props;
        return (
            <Route
                path={to}
                exact={true}
                children={(props) => (
                    <Link
                     to={to}
                     className={`${className} ${props.match ? 'active' : ''}`}
                    >
                        {this.props.children}
                    </Link>
                )}
            />
        )
    }
}