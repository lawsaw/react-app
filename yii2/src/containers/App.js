import React from 'react';
import '../styles/style.scss';
import {apiPost} from '../helpers';
import renderHTML from 'react-render-html';
import Button from './Button';
import Svg from './Svg';
import Dropdown from './Dropdown';



export default class extends React.Component {

    state = {
        content: ''
    }

    getSvgFile = () => {
        const svgContainer = document.getElementById('svg-container');
        apiPost(`backend/svg`)
            .then(response => {
                svgContainer.innerHTML = response
            })
    }

    componentWillMount() {
        this.getSvgFile();
    }

    handleLoad = (request) => {
        this.setState(() => ({
            content: 'Loading'
        }))
        apiPost(`backend/${request}`, {'page': 456})
            .then(response => {
                setTimeout(() => {
                    this.setState(() => ({
                        content: response
                    }))
                },1000)
            })
    }

    fuckClick = () => {
        console.log('56рпарва')
    }

    render() {
        const {content} = this.state;
        console.log(content);

        return(
            <div className={`container`}>

                <Svg icon='icon-balance' className='gfdsgdf' />


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
                        type: 'svg',
                        value: 'icon-balance',
                    }}
                    iconAfter={{
                        type: 'fa',
                        value: 'angle-down',
                    }}
                >
                    <ul>
                        <li>link 1</li>
                        <li><a href='#' onClick={this.fuckClick}>gffdg</a></li>
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

                <div className={`buttons`}>
                    <button onClick={() => {this.handleLoad('about')}}>Загрузить контент страницы "О Компании"</button>
                    <button>Загрузить контент страницы "Контакты"</button>
                </div>
                <div className={`content`}>
                    {renderHTML(content)}
                </div>
            </div>
        )
    }

}