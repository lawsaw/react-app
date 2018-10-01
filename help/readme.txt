1) Show configs
    npm run eject

2) SASS/SCSS
    2.1) npm install sass-loader node-sass --save-dev
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

