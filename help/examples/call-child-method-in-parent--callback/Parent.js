import Child from './Child'

class Parent extends React.Component {

    constructor(props) {
        super(props);
        this.someFunction = null;
    }

    playFunction = (f) => {
        this.someFunction = f;
    }

    render() {
        return (
            <div>
                <Child externalMethod={this.playFunction} />
                <button onClick={this.someFunction}>call childFunction from Child.js</button>
            </div>
        )
    }

}