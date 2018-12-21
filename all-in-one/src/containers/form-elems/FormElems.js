import React, { Component } from 'react';
import Dropdown from "./Dropdown";
import Svg from "./Svg";
import Button from "./Button";
import {Link} from "react-router-dom";

export default class extends Component {

    fuckClick = () => {
        console.log('click');
    }

    render() {
        return (
            <div className={`page`}>



                <Dropdown
                    className='megaclass'
                    test='56566'
                    href='#suka'
                    size='L'
                    title='Открыть дропдаун'
                    linkAttr={{
                        'fuck': 6466
                    }}
                >
                    <ul>
                        <li>test</li>
                    </ul>
                    <p><Link to='/tic-tac-toe'>Крестики-нолики</Link></p>
                    <p>test2</p>
                </Dropdown>

                <Dropdown
                    className='megaclass'
                    test='56566'
                    href='#suka'
                    size='L'
                    title='Открыть дропдаун 2'
                    linkAttr={{
                        'fuck': 6466
                    }}
                    iconBefore={{
                        type: 'fas',
                        value: 'angle-down',
                    }}
                    iconAfter={{
                        type: 'fab',
                        value: 'android',
                    }}
                >
                    <ul>
                        <li>link 1</li>
                        <li><a href='#test' onClick={this.fuckClick}>gffdg</a></li>
                    </ul>
                </Dropdown>

                <Button
                    size='M'
                    theme='green'
                    href='#pizda'
                    iconBefore={{
                        type: 'svg',
                        value: 'icon-balance',
                    }}
                    iconAfter={{
                        type: 'block',
                        value: '<span>huy</span>',
                    }}
                    onClick={() => {
                        console.log('click');
                    }}
                >
                    Button
                </Button>

            </div>
        )
    }
}
