import './assets/css/style.css';
import {App} from "./core/App/App.ts";
import AppRoutes from "./core/App/AppRoutes.ts";
import HomeView from "./core/pages/homeView.ts";
import AppConfig from "./core/App/AppConfig.ts";

window.onload = () => {

    const root = document.getElementById('app');
    if (!root) {
        console.error('No app element was found.');
        return;
    }

    const options: AppConfig = {
        title: import.meta.env.VITE_TITLE
    };

    const routes: AppRoutes = [
        { title: 'Home', path: '/philip-rosenqvist/', controller: () => { return HomeView() } },
        //{ title: 'About me', path: '/philip-rosenqvist/about', controller: () => { return HomeView() } }
    ];

    const app = new App(root, routes, options);
    app.run();

};