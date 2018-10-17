import App from './app.js';

const app = new App();
app.start();

if (module.hot) {
    module.hot.accept('./app.js', function () {
        console.log('Accepting the updated printMe module!');
        app()
    })
}