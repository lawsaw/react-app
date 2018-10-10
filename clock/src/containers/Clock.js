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
            hours = this.time.getHours() > 12 ? (this.time.getHours()-12)*30 : this.time.getHours()*30;
        this.setState(() => ({seconds, minutes, hours}))
    }

    render() {
        let seconds = {transform: `rotateZ(${this.state.seconds}deg)`}
        let minutes = {transform: `rotateZ(${this.state.minutes}deg)`}
        let hours = {transform: `rotateZ(${this.state.hours}deg)`}
        return(
            <div className="clock">
                {
                    [1,2,3,4,5,6,7,8,9,10,11,12].map((digit) => (
                        (
                            <div className="clock-digit">
                                <div className="clock-digit-value">
                                    |
                                </div>
                            </div>
                        )
                    ))
                }
                <div className="clock-elec">
                    {this.time.getHours()}:
                    {this.time.getMinutes()}:
                    {this.time.getSeconds() < 10 ? `0${this.time.getSeconds()}` : this.time.getSeconds()}
                </div>
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