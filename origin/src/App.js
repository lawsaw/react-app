import React, { Component } from 'react';
import logo from './logo.svg';
import './style/App.css';
import './style/bootstrap.min.css';

import { TotalNews } from './components/TotalNews';

// class App extends Component {
//   render() {
//     return (
//
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//
//     );
//   }
// }
//test
const articles = [
    {
        title: 'Новости политики',
        short_content: 'Жили были президенты...',
        long_content: 'Это полная версия текста про Жили были президенты...'
    },
    {
        title: 'Новости финансов',
        short_content: 'Денег нет и не будет...',
        long_content: 'Это полная версия текста про Денег нет и не будет...'
    },
    {
        title: 'Новости экономики',
        short_content: 'Экономия должна быть во всем...',
        long_content: 'Это полная версия текста про Экономия должна быть во всем...'
    }
];


class App extends React.Component {
    render() {
        return (
            <div className='app'>
                <TotalNews data={articles} />
            </div>
        )
    }
}





export default App;
