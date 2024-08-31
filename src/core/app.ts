import AppView from "./view/appView.ts";
import Router from "./router.ts";
import Route from "./route.ts";
import HomeView from "./view/homeView.ts";
import Config from "./config.ts";

export default class App {

    private root: HTMLElement;
    private router: Router;

    constructor(root: HTMLElement) {
        this.root = root;

        const routes: Array<Route> = [
            new Route("/", HomeView, {
                title: "Portfolio"
            })
        ];

        this.router = new Router(routes);

    }

    public run(): void {
        const route: Route | null = <Route> this.router.match(window.location);
        if (!route) {
            console.error("Error 404");
            return;
        }
        this.updateView(route);
    }

    private updateView(route: Route): void {
        this.updateDocTitle(route.options?.title);

        this.clearRootView();
        const page = route.view();
        const view = <string> AppView(page);
        this.root.insertAdjacentHTML('beforeend', view);

        document.querySelectorAll('a').forEach((a: HTMLAnchorElement) => {
            a.addEventListener('click', (e: MouseEvent) => {
                if (a.host === window.location.host) {
                    e.preventDefault();
                    this.updateView(route);
                } else {
                    // External link.
                }
            });
        });

    }

    private clearRootView(): void {
        while (this.root.firstChild) {
            this.root.removeChild(this.root.firstChild);
        }
    }

    private updateDocTitle(title: string = ""): void {
        document.title = `${title} | ${Config.TITLE}`;
    }

}