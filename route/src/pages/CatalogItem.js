import React from 'react'
import { Link, Route } from 'react-router-dom'
import Computers from './catalog/Computers'

export default class extends React.Component {
    render() {
        const { match } = this.props;
        return (
            <div>
                <h1>Catalog</h1>
                <p>
                    catalog list...
                </p>

                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to={`${match.url}/computers`} className="nav-link">Computers</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`${match.url}/oranges`} className="nav-link">Oranges</Link>
                    </li>
                </ul>

                <Route exact path={`${match.url}/:someTest`} component={Computers} />
                <Route exact path={`${match.path}`} render={() => <div>hdgfhdgfhdfghdgf</div>} />

            </div>
        )
    }
}