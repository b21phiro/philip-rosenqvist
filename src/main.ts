import './assets/css/style.css';
import App from "./core/App/App.ts";
import AppRoutes from "./core/App/AppRoutes.ts";
import Route from "./core/route.ts";
import HomeView from "./core/view/homeView.ts";
import AppConfig from "./core/App/AppConfig.ts";

window.onload = () => {

    const root = document.getElementById('app');
    if (!root) {
        console.error('No app element was found.');
        return;
    }

    const options: AppConfig = {
        baseFolderPath: '/philip-rosenqvist',
        title: import.meta.env.VITE_TITLE
    };

    const routes: AppRoutes = [
        new Route(`${options.baseFolderPath}/`, HomeView, {
            title: "Portfolio"
        })
    ];

    const app = new App(root, routes, options);
    app.run();

};