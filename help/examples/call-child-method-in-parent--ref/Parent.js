import Child from './Child'

class Parent extends React.Component {

    constructor(props) {
        super(props);
        this.someRef = React.createRef();
    }

    playFunction = (ref) => {
        if(ref) {
            this.someRef = ref.getWrappedInstance()
        }
    }

    render() {
        return (
            <div>
                <Child ref={this.playFunction} />
                <button onClick={this.someRef.childFunction}>call childFunction from Child.js</button>
            </div>
        )
    }

}