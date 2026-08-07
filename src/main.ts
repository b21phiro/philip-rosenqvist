import App from "./App.ts";
import './assets/css/fonts/nunito.css';
import './assets/css/themes/default.css';
import './assets/css/layouts/app.css';
import './assets/css/layouts/header.css';
import './assets/css/modules/logo.css';
import './assets/css/base.css';

(() => {

    const app = new App(document.getElementById('app')!);
    app.run();

})();