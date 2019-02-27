import React, { Component } from 'react';
import Dropdown from "./Dropdown";
import Svg from "./Svg";
import Button from "./Button";
import {Link} from "react-router-dom";
import CustomLink from "./CustomLink";
import Tooltip from "./Tooltip";

export default class extends Component {

    fuckClick = () => {
        console.log('click');
    }

    render() {
        return (
            <div className={`page`}>

                <Dropdown>
                    dropdown with no props at all
                </Dropdown>
                <Tooltip
                    front={'tooltip'}
                    event={'mousemove'}
                >
                    Some back content for tooltip<br />
                    Some back content for tooltip
                </Tooltip>
                <Dropdown
                    front={<strong><i>tags</i> <i>front</i></strong>}
                >
                    <p>dropdown with TAGs front</p>
                </Dropdown>

                <Dropdown
                    front={'string dropdown'}
                >
                    <p>dropdown with STRING front</p>
                    <CustomLink to='/tic-tac-toe'>Крестики-нолики</CustomLink>
                </Dropdown>

                <Dropdown
                    front={
                        <Button
                            className='megaclass'
                            test='56566'
                            href='#suka'
                            size='L'
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
                            Открыть дропдаун 2
                        </Button>
                    }
                >
                    <p>dropdown with COMPONENT front</p>
                    <ul>
                        <li>link 1</li>
                        <li><a href='#test'>gffdg</a></li>
                    </ul>
                    <Dropdown
                        front={
                            <Button
                                className='megaclass'
                                test='56566'
                                href='#suka'
                                size='L'
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
                                Открыть дропдаун 2
                            </Button>
                        }
                    >
                        <p>dropdown with COMPONENT front</p>
                        <ul>
                            <li>link 1</li>
                            <li><a href='#test'>gffdg</a></li>
                        </ul>
                    </Dropdown>
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
                    Just Button
                </Button>

                <Tooltip
                    front={<div><div>big</div><div>front</div><div>tooltip</div></div>}
                >
                    Some back content for tooltip
                </Tooltip>

                <div>
                    <Tooltip
                        front={<Button
                            className='megaclass'
                            test='56566'
                            href='#suka'
                            size='L'
                            linkAttr={{
                                'fuck': 6466
                            }}
                            iconAfter={{
                                type: 'fab',
                                value: 'android',
                            }}
                        >
                            Открыть Тултип
                        </Button>}
                    >
                        Some back content for tooltip
                    </Tooltip>
                </div>

            </div>
        )
    }
}
