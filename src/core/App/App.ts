import AppRoutes from "./AppRoutes.ts";
import AppView from "../view/appView.ts";
import Router from "../router.ts";
import Route from "../route.ts";
import AppConfig from "./AppConfig.ts";

export default class App {

    private root: HTMLElement;
    private router: Router;

    private readonly title: string;

    constructor(root: HTMLElement, routes: AppRoutes, options: AppConfig) {
        this.root = root;
        this.router = new Router(routes);

        this.title = options.title;

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
                if (a.host === window.location.host && !a.hash) {
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
        document.title = `${title} | ${this.title}`;
    }

}