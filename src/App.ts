import AppView from "./AppView.ts";
import AppModel from "./AppModel.ts";
import AppController from "./AppController.ts";
import { PageID, PagePaths } from "./pages/Page.ts";

export default class App {

    private view        : AppView;
    private model       : AppModel;
    private controller  : AppController;

    public constructor(root: HTMLElement) {

        this.view       = new AppView(root);
        this.model      = new AppModel(this.view);
        this.controller = new AppController(this.model);

        // Handles clicking navigation as SPA.
        window.addEventListener('click', (e) => {
           if (e.target instanceof HTMLAnchorElement) {
               e.preventDefault();
               this.goTo(e.target.pathname);
               window.history.pushState({}, '', e.target.pathname);
           }
        });

        // Handles SPA navigation when user is using browser arrow-functions.
        window.addEventListener('popstate', () => {
            this.goTo(window.location.pathname);
        });

        // Preload page modules and init their instance when being hovered on.
        window.addEventListener('mouseover', (e) => {
            if (e.target instanceof HTMLAnchorElement) {
                e.preventDefault();
                const page = this.findPageID(e.target.pathname);
                if (page === PageID.Unknown) return;
                this.controller.loadPage(page);
            }
        });

    }

    public run(): void {
        this.goTo(window.location.pathname);
    }

    public goTo(pathname: string): void {
        this.controller.showPage(this.findPageID(pathname));
    }

    public findPageID(pathname: string): number {
        if      (pathname === PagePaths.Home    ) return PageID.Home;
        else if (pathname === PagePaths.About   ) return PageID.About;
        else if (pathname === PagePaths.Blog    ) return PageID.Blog;
        else if (pathname === PagePaths.Contact ) return PageID.Contact
        else                                      return PageID.Unknown;
    }

}