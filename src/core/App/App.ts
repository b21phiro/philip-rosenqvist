import AppRoutes from "./AppRoutes.ts";
import AppView from "../view/appView.ts";
import AppRouter from "./AppRouter.ts";
import AppConfig from "./AppConfig.ts";

export class App {

    private root: HTMLElement;
    private router: AppRouter;

    private readonly title: string;

    constructor(root: HTMLElement, routes: AppRoutes, options: AppConfig) {
        this.root = root;
        this.router = new AppRouter(routes);
        this.title = options.title;

        document.querySelectorAll('a').forEach((a: HTMLAnchorElement) => {
            a.addEventListener('click', (e: MouseEvent) => {
                if (a.host != window.location.host || a.hash) return;
                e.preventDefault();
            });
        });
    }

    public run(): void {
        const found = this.router.findRoute(window.location);
        if (!found) {
            console.error("Error 404");
            return;
        }
        this.updateDocTitle(found.title);
        this.updateView(found.controller());
    }

    private updateView(page: string): void {
        this.clearRootView();
        this.root.insertAdjacentHTML('beforeend', AppView(page));
    }

    private clearRootView(): void {
        this.root.innerHTML = "";
    }

    private updateDocTitle(title: string = ""): void {
        document.title = `${title} | ${this.title}`;
    }

}