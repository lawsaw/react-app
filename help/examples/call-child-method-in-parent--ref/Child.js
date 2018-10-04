class Child extends React.Component {

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

// if connect is present:
//
// export default connect(
//     null,
//     null,
//     null,
//     { withRef: true }
// )(Child)