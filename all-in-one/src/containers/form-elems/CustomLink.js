import React from 'react'
import { Link, Route } from 'react-router-dom'

export default class extends React.Component {

    static defaultProps = {
        innerRef: () => {
            console.log('default function');
        }
    }

    render() {
        const { to, className, innerRef } = this.props;
        return (
            <Route
                path={to}
                exact={true}
                children={(props) => (
                    <Link
                        to={to}
                        innerRef={innerRef}
                        className={`${className} ${props.match ? 'active' : ''}`}
                    >
                        {this.props.children}
                    </Link>
                )}
            />
        )
    }
}