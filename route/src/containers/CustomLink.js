import React from 'react'
import { Link, Route } from "react-router-dom";

export default class extends React.Component {
    render() {
        //console.log(this.props);
        const {to, active, className} = this.props;
        return (
            <Route
                path={to}
                exact={active}
                children={(props) => (
                    <div>
                        {/*console.log(props)*/}
                        <Link
                            to={to}
                            className={className}
                        >
                            {props.match ? ">" : ""} {this.props.children}
                        </Link>
                    </div>
                )}
            />
        )
    }
}