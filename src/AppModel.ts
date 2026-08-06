import type AppView from "./AppView.ts";
import Page, { PageID } from "./pages/Page.ts";
import Home from "./pages/Home.ts";

export default class AppModel {

    private view: AppView;
    private pages: Map<number, Page>;

    public constructor(view: AppView) {
        this.view = view;

        // Pre-initialized and cached pages.
        this.pages = new Map([
            [PageID.Home, new Home()]
        ]);

    }

    public async setCurrentPage(pageID: number): Promise<void> {
        if (!this.hasPageBeenLoadedOnceAlready(pageID)) {

            this.view.showLoading();

            // Exceptions thrown here will bubble up and handled
            // by the controller.
            await this.loadPage(pageID);

        }
        this.view.showPage(this.getPage(pageID));
    }

    public getPage(pageID: number): Page {
        if (!this.pages.has(pageID)) {
            throw new Error("Page does not exist or has not been loaded yet.");
        }
        return this.pages.get(pageID)!;
    }

    public async loadPage(pageID: number) {

        if (this.hasPageBeenLoadedOnceAlready(pageID)) return;

        try {
            switch (pageID) {
                case PageID.About:
                    this.pages.set(pageID, new (await import("./pages/About.ts")).default());
                    break;
                case PageID.Blog:
                    this.pages.set(pageID, new (await import("./pages/Blog.ts")).default());
                    break;
                case PageID.Contact:
                    this.pages.set(pageID, new (await import("./pages/Contact.ts")).default());
                    break;
                case PageID.Home:
                case PageID.Unknown:
                default:
                    break;
            }
        } catch (e) {
            throw new Error(`Failed to load page: ${pageID}`);
        }
    }

    public hasPageBeenLoadedOnceAlready(page: number): boolean {
        return this.pages.has(page);
    }

}