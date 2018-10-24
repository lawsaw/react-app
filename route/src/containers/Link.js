import React from 'react'

export default class extends React.Component {

    handleClick = () => {
        //window.location.href = this.props.link;
        history.pushState(null, null, this.props.link);
        console.log(this.props.link);
    }

    render() {
        const { title, link } = this.props;
        return (
            <a
                href={link}
                onClick={(e) => {e.preventDefault(); this.handleClick()}}
            >
                {title}
            </a>
        )
    }
}