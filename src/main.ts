import './assets/css/style.css';
import App from "./core/app.ts";

window.onload = (): void => {
    const root: HTMLElement = <HTMLElement> document.getElementById('app');
    if (!root) {
        console.error('No app element was found.');
        return;
    }

    const app = new App(root);
    app.run();

};