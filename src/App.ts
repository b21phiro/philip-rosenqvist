import AppView from "./AppView.ts";
import AppModel from "./AppModel.ts";
import AppController from "./AppController.ts";

export default class App {

    private view: AppView;
    private model: AppModel;
    private controller: AppController;

    public constructor(root: HTMLElement) {
        this.view = new AppView(root);
        this.model = new AppModel(this.view);
        this.controller = new AppController(this.model);

        window.addEventListener('click', (e) => {
           if (e.target instanceof HTMLAnchorElement) {
               e.preventDefault();
               this.goTo(e.target.pathname);
           }
        });

    }

    public run(): void {
        this.goTo(window.location.pathname);
    }

    public goTo(pathname: string): void {
        switch (pathname) {
            case '/philip-rosenqvist/':
                this.controller.showHomePage();
                break;
            case '/philip-rosenqvist/about':
                this.controller.showAboutMePage();
                break;
            case '/philip-rosenqvist/blog':
                this.controller.showBlogPage();
                break;
            case '/philip-rosenqvist/contact':
                this.controller.showContactPage();
                break;
            default:
                console.error("Error 404");
                break;
        }
    }

}