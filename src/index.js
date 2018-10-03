import app from './app.js';

app()

if (module.hot) {
    module.hot.accept('./app.js', function () {
        console.log('Accepting the updated printMe module!');
        app()
    })
}