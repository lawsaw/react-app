import React from 'react'
import '../styles/style.scss'
import Page1 from './Page1'
import Page2 from './Page2'
import PageHome from './PageHome'

export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        route: null,
        //route: window.location.hash.substr(1),
        //Почти аналогично. Такая очевидная запись препятствует последующему переназначению.
        //Работает, если в значении указать смысловое значение из кода дальше:
        //hash: window.location.hash.substr(1);
    }

    hashListener = () => {
        const hash = window.location.hash.substr(1);
        this.setState(() => ({
            route: hash
        }))
    }

    componentDidMount() {
        window.addEventListener('hashchange', this.hashListener);
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.hashListener);
    }

    render() {

        let Child = null;
        switch(this.state.route) {
            case 'page1':
                Child = Page1;
                break;
            case 'page2':
                Child = Page2;
                break;
            default:
                Child = PageHome;
                break;
        }

        return (
            <div className="container">
                <a href="#page1">Page 1</a>
                <a href="#page2">Page 2</a>
                <Child />
            </div>
        )
    }
}