import React from 'react'

export default class extends React.Component {
    render() {
        return (
            <div>
                <h1>Protected</h1>
                <p>
                    You see this page. It means you passes the security successed! Congratulations!
                </p>
            </div>
        )
    }
}