import React, { Component } from 'react';
import Dropdown from "./Dropdown";
import Svg from "./Svg";
import Button from "./Button";
import {Link} from "react-router-dom";
import CustomLink from "./CustomLink";

export default class extends Component {

    fuckClick = () => {
        console.log('click');
    }

    render() {
        return (
            <div className={`page`}>



                <Dropdown
                    button={false}
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
                    <p><CustomLink to='/tic-tac-toe'>Крестики-нолики</CustomLink></p>
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
                        animated: true,
                    }}
                    iconAfter={{
                        type: 'fab',
                        value: 'android',
                    }}
                >
                    <ul>
                        <li>link 1</li>
                        <li><a href='#test'>gffdg</a></li>
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
