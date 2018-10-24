1) Show configs
    npm run eject

2) SASS/SCSS
    2.1) npm i sass-loader node-sass --save
    2.2) Insert this into 'loaders':
        {
            test: /\.scss$/,
            include: paths.appSrc,
            loaders: ["style", "css", "sass"]
        },
    2.3) Insert this into 'loaders/exclude' array:
        /\.sass$/,
        /\.scss$/,
    2.4) Copy/Past 'styles' dir
    2.5) import './styles/style.scss';

3) Redux
    3.1) npm i redux react-redux --save

4) Modals
    4.1) Copy/Past 'modal-container' inner files into /containers dir
    4.2) Update root html file with this layout:
        <div id="root">
          <div id="app-root"></div>
          <div id="modal-root"></div>
        </div>
    4.3) Use modalAwesome.scss for styling
    4.4) Look for TestModal.js for usage examples

5) Routes
    5.1) npm i react-router-dom --save
    5.2) Wrap main <App> with <BrowserRouter> tag
    5.3) Use import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
