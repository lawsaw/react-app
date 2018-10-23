import React from 'react'
import ModalForm from './ModalForm'

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.cookiesToDelete = [];
        this.addCookieForm = {
            name: null,
            value: null,
            expires: null,
            path: null,
            domain: null,
            secure: null,
        };
        this.expiresVariants = [
            {
                title: '15 sec',
                value: 15,
            },
            {
                title: '30 sec',
                value: 30,
            },
            {
                title: '1 min',
                value: 60,
            }, {
                title: 'never',
                value: null,
            },
        ];
    }

    state = {
        modalAddCookie: false,
        modalDeleteCookie: false,
        activeExpires: '',
        currentCookies: null,
    }

    componentDidMount() {
        this.handleLogCookies();
    }

    handleLogCookies = () => {
        this.setState(() => ({
            currentCookies: document.cookie
        }))
    }

    handleModalAddCookieToggle = () => {
        this.setState(() => ({
            modalAddCookie: !this.state.modalAddCookie
        }))
    }

    handleModalDeleteCookieToggle = () => {
        this.setState(() => ({
            modalDeleteCookie: !this.state.modalDeleteCookie
        }))
    }

    handleSetExpires = (title) => {
        this.setState(() => ({
            activeExpires: title
        }))
    }

    handleAddCookieSubmit = () => {
        let name, value, options={};
        for(let item in this.addCookieForm) {
            if(this.addCookieForm[item] === null ) continue;
            if(item === 'name') name = this.addCookieForm[item];
            if(item === 'value') value = this.addCookieForm[item];
            if(item === 'expires' || item === 'path' || item === 'domain' || item === 'secure') options[item] = this.addCookieForm[item]
        }
        this.setCookie(name, value, options);
    }

    handleAddCookieReject = () => {}

    handleAddCookieChange = (formElem, value) => {

        this.addCookieForm[formElem] = value;

    }

    setCookie = (name, value, options) => {
        options = options || {};
        var expires = options.expires;
        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }
        value = encodeURIComponent(value);
        var updatedCookie = name + "=" + value;
        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
        document.cookie = updatedCookie;
        this.handleLogCookies();
    }

    deleteCookie = (name) => {
        this.setCookie(name, "", {
            expires: -1
        })
        this.handleLogCookies();
    }

    getCookiesNameList = () => {
        console.log(document.cookie.length);
        if(!document.cookie.length) return false;
        let cookies = document.cookie.split(';');
        return cookies.map((item) => {
            let namePosition = item.indexOf('=');
            let name = item.slice(0, namePosition);
            return name;
        });
    }

    handleCookieSelectForDeletion = (name, value) => {
        if(value) {
            this.cookiesToDelete.push(name);
        } else {
            this.arrayRemoveItem(this.cookiesToDelete, name);
        }
        //console.log(`${name}: ${value}`)
    }

    handleCookiesDeleteResolve = () => {
        this.cookiesToDelete.forEach((cookie) => {
            this.deleteCookie(cookie);
        })
    }

    handleCookiesDeleteReject = () => {}

    arrayRemoveItem = (arr, item) => {
        let idx = arr.indexOf(item);
        if(idx !== -1) {
            return arr.splice(idx, 1);
        }
        return false;
    }


    render() {
        return (
            <React.Fragment>
                <div className='container'>
                    <div className="row">
                        <div className="col-3">
                            <div className="btn-group-vertical">
                                <button className="btn btn-info" onClick={this.handleLogCookies}>Refresh Cookies</button>
                                <br />
                                <button className="btn btn-info" onClick={this.handleModalAddCookieToggle}>Add cookie</button>
                                <br />
                                <button className="btn btn-info" onClick={this.handleModalDeleteCookieToggle}>Delete cookie</button>
                            </div>
                        </div>
                        <div className="col-9 screen">
                            {this.state.currentCookies}
                        </div>
                    </div>
                </div>

                {
                    this.state.modalAddCookie ? (

                        <ModalForm
                            title='Form'
                            styleAppear='modalAwesome--fromZoomOut'
                            styleDisappear='modalAwesome--toZoomIn'
                            onClose={this.handleModalAddCookieToggle}
                            onResolve={this.handleAddCookieSubmit}
                            onReject={this.handleAddCookieReject}
                        >
                            <form>
                                <div className="form-row">
                                    <div className="col-sm-12 col-md-6">
                                        <div className="form-group">
                                            <label>Cookie name</label>
                                            <input onChange={(e) => {this.handleAddCookieChange('name', e.currentTarget.value)}} type="text" className="form-control" placeholder="Cookie name" />
                                            <small className="form-text text-muted">Enter cookie name</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div className="form-group">
                                            <label>Cookie value</label>
                                            <input onChange={(e) => {this.handleAddCookieChange('value', e.currentTarget.value)}} type="text" className="form-control" placeholder="Cookie value" />
                                            <small className="form-text text-muted">Enter cookie value</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Expires</label>
                                    <br />
                                    <div className="btn-group">
                                        {
                                            this.expiresVariants.map((item, index) => (
                                                <button
                                                    key={index}
                                                    className={`btn btn-info ${this.state.activeExpires === item.title ? 'active' : ''}`}
                                                    onClick={(e) => {e.preventDefault(); this.handleSetExpires(item.title); this.handleAddCookieChange('expires',  item.value)}}
                                                >
                                                    {item.title}
                                                </button>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">path</label>
                                    <input onChange={(e) => {this.handleAddCookieChange('path', e.currentTarget.value)}} type="text" className="form-control" placeholder="path" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">domain</label>
                                    <input onChange={(e) => {this.handleAddCookieChange('domain', e.currentTarget.value)}} type="text" className="form-control" placeholder="domain" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">secure</label>
                                    <input onChange={(e) => {this.handleAddCookieChange('secure', e.currentTarget.value)}} type="text" className="form-control" placeholder="secure" />
                                </div>
                            </form>
                        </ModalForm>

                    ) : null
                }

                {
                    this.state.modalDeleteCookie ? (

                        <ModalForm
                            title='Form'
                            styleAppear='modalAwesome--fromLeft'
                            styleDisappear='modalAwesome--toRight'
                            onClose={this.handleModalDeleteCookieToggle}
                            onResolve={this.handleCookiesDeleteResolve}
                            onReject={this.handleCookiesDeleteReject}
                            labelResolve="Delete selected"
                            labelReject="Cancel"
                        >
                            <form>
                                {
                                    this.getCookiesNameList().length ? this.getCookiesNameList().map((item, index) => (
                                        <label key={index} className="form-check">
                                            <input onChange={(e) => {this.handleCookieSelectForDeletion(item, e.currentTarget.checked)}} className="form-check-input" type="checkbox" value="" />
                                            <div className="form-check-label">
                                                {item}
                                            </div>
                                        </label>
                                    )) : <p>The is no cookies at all</p>
                                }
                            </form>
                        </ModalForm>

                    ) : null
                }

            </React.Fragment>
        )
    }
}