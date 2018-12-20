import React from 'react';
import CubFace from './CubFace';

export default class extends React.Component {

    state = {
        deg: {
            x: 0,
            y: 0,
            z: 0,
            duration: 0,
            easing: 'linear',
        }
    }

    constructor(props) {
        super(props);

        this.duration = 3000;
        this.params = {
            front: {
                value: 1,
                deg: {
                    x: 0,
                    y: 0,
                    z: 0,
                }
            },
            back: {
                value: 6,
                deg: {
                    x: 180,
                    y: 0,
                    z: 180,
                }
            },
            right: {
                value: 3,
                deg: {
                    x: 0,
                    y: -90,
                    z: 0,
                }
            },
            left: {
                value: 4,
                deg: {
                    x: 0,
                    y: 90,
                    z: 0,
                }
            },
            top: {
                value: 2,
                deg: {
                    x: -90,
                    y: 0,
                    z: 0,
                }
            },
            bottom: {
                value: 5,
                deg: {
                    x: 90,
                    y: 0,
                    z: 0,
                }
            }
        }
    }


    getTrueSideObj = (side) => {
        return this.params[Object.keys(this.params).filter((key) => (this.params[key]['value'] === side))];
    }

    setTruePos = () => {
        const {value} = this.props;
        const obj = this.getTrueSideObj(value);
        this.setState(() =>({
            deg: {
                x: obj.deg.x,
                y: obj.deg.y,
                z: obj.deg.z,
                duration: this.duration/1000,
                easing: 'ease-out'
            }
        }))
    }

    setRandomPos = () => {
        const randomPos = {
            x: Math.floor(Math.random() * 1500) - 1500,
            y: Math.floor(Math.random() * 1500) - 1500,
            z: Math.floor(Math.random() * 1500) - 1500,
            duration: 0,
            easing: 'ease-out'
        }
        this.setState(() =>({
            deg: randomPos
        }))
        setTimeout(() => {
            this.setTruePos();
        }, 1)
    }

    componentWillReceiveProps(oldProps) {
        if(oldProps !== this.props) {
            console.log(oldProps);
            this.setRandomPos();
        }
    }

    render() {

        const {x,y,z, duration, easing} = this.state.deg;
        return (
            <React.Fragment>
                <div className={`cubeAwesome`} style={{
                    transform: `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`,
                    transition: `transform ${duration}s ${easing} 0s`
                }}>
                    {
                        Object.keys(this.params).map((key, index, arr) => (
                            <CubFace key={index} face={key}>
                                {this.params[key]['value']}
                            </CubFace>
                        ))
                    }

                </div>

                {/*<div>*/}
                {/*{*/}
                    {/*[1,2,3,4,5,6].map((key, index) => (*/}
                        {/*<button onClick={() => this.getTrueSideObj(key)} key={index}>{key}</button>*/}
                    {/*))*/}
                {/*}*/}
                {/*</div>*/}

            </React.Fragment>
        )
    }
}