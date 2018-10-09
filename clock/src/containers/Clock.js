import React from 'react'

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.timer = null;
        this.time = new Date();
    }

    state = {
        seconds: null,
        minutes: null,
        hours: null,
    }

    componentDidMount() {
        this.setDegs();
        this.timer = setInterval(() => {
            this.time = new Date();
            this.setDegs();
        },1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    setDegs = () => {
        let seconds = this.time.getSeconds()*6,
            minutes = this.time.getMinutes()*6,
            hours = this.time.getHours()*6;
        this.setState(() => ({seconds, minutes, hours}))
    }

    render() {
        let seconds = {transform: `rotateZ(${this.state.seconds}deg)`}
        let minutes = {transform: `rotateZ(${this.state.minutes}deg)`}
        let hours = {transform: `rotateZ(${this.state.hours}deg)`}
        return(
            <div className="clock">
                {this.time.getSeconds()}
                -
                <div className="clock-point">
                    <div className="clock-point-decor"></div>
                    <div className="clock-handHandler">
                        <div className="clock-hand clock-hand--hour" style={hours}></div>
                    </div>
                    <div className="clock-handHandler">
                        <div className="clock-hand clock-hand--minute" style={minutes}></div>
                    </div>
                    <div className="clock-handHandler">
                        <div className="clock-hand clock-hand--second" style={seconds}></div>
                    </div>
                </div>
            </div>
        )
    }
}