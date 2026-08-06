import AppRoutes from "./AppRoutes.ts";
import AppView from "./AppView.ts";
import AppRouter from "./AppRouter.ts";
import AppConfig from "./AppConfig.ts";

export class App {

    private router: AppRouter;
    private view: AppView;

    constructor(root: HTMLElement, routes: AppRoutes, options: AppConfig) {
        this.view = new AppView(root, options.title);
        this.router = new AppRouter(routes);

        document.querySelectorAll('a').forEach((a: HTMLAnchorElement) => {
            a.addEventListener('click', (e: MouseEvent) => {
                if (a.host != window.location.host || a.hash) return;
                e.preventDefault();
            });
        });
    }

    public run(): void {
        const route = this.router.findRoute(window.location);
        if (!route) {
            console.error("Error 404");
            return;
        }
        this.view.render(route);
    }
}