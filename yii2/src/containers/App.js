import React from 'react';
import '../styles/style.scss';
import {apiGet, apiPost} from '../helpers';
import renderHTML from 'react-render-html';
import Button from './Button';
import Svg from './Svg';

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

    convertToHTML = (str) => {

            let tmp = document.implementation.createHTMLDocument();
            tmp.body.innerHTML = str;
            return tmp.body.children;

    }
 
    render() {
        const {content} = this.state;
        console.log(content);

        return(
            <div className={`container`}>

                <Svg icon='icon-balance' className='gfdsgdf' />

                <Button
                    size='sizeM'
                    color='lightblue'
                    attr={{href: '#'}}
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