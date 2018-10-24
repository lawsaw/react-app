import React from 'react'

export default class extends React.Component {
    render() {
        const { page } = this.props;
        return (
            <div>
                <p>
                    Страница {page} не найдена здесь. Это 404, братан...
                </p>
            </div>
        )
    }
}