import React, { Component } from 'react';
import Dropdown from "./Dropdown";
import Svg from "./Svg";
import Button from "./Button";

export default class extends Component {
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
                    content of dropdown
                </Dropdown>

                {/*<Dropdown*/}
                    {/*className='megaclass'*/}
                    {/*test='56566'*/}
                    {/*href='#suka'*/}
                    {/*size='L'*/}
                    {/*title='Открыть дропдаун 2'*/}
                    {/*linkAttr={{*/}
                        {/*'fuck': 6466*/}
                    {/*}}*/}
                    {/*iconBefore={{*/}
                        {/*type: 'block',*/}
                        {/*value: 'test',*/}
                    {/*}}*/}
                    {/*iconAfter={{*/}
                        {/*type: 'fa',*/}
                        {/*value: 'angle-down',*/}
                    {/*}}*/}
                {/*>*/}
                    {/*<ul>*/}
                        {/*<li>link 1</li>*/}
                        {/*<li><a href='#' onClick={this.fuckClick}>gffdg</a></li>*/}
                    {/*</ul>*/}
                {/*</Dropdown>*/}

                {/*<Button*/}
                    {/*size='M'*/}
                    {/*theme='green'*/}
                    {/*href='#pizda'*/}
                    {/*iconBefore={{*/}
                        {/*type: 'svg',*/}
                        {/*value: 'icon-balance',*/}
                    {/*}}*/}
                    {/*iconAfter={{*/}
                        {/*type: 'block',*/}
                        {/*value: '<span>huy</span>',*/}
                    {/*}}*/}
                    {/*onClick={() => {*/}
                        {/*console.log('click');*/}
                    {/*}}*/}
                {/*>*/}
                    {/*Button*/}
                {/*</Button>*/}

            </div>
        )
    }
}
