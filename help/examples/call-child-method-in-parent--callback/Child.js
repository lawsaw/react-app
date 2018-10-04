class Child extends React.Component {

    componentDidMount() {
        this.props.externalMethod(this.childFunction);
    }

    childFunction = () => {
        alert('success method from Child');
    }

    render() {
        return (
            <div>
                some content
            </div>
        )
    }

}

export default Child;