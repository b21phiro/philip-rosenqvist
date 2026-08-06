import './assets/css/style.css';
import App from "./core/App/App.ts";

window.onload = () => {

    const root = document.getElementById('app');
    if (!root) {
        console.error('No app element was found.');
        return;
    }

    const app = new App(root, {
        baseFolderPath: '/philip-rosenqvist'
    });
    app.run();

};