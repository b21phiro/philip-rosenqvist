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
            await this.loadPage(pageID);
        }
        const page = this.getPage(pageID);
        this.setDocTitle(page.title);
        this.view.showPage(page);
    }

    public setDocTitle(title: string): void {
        document.title = `${title} | Philip Rosenqvist`;
    }

    public getPage(pageID: number): Page {
        if (!this.pages.has(pageID)) {
            throw new Error("Page does not exist or has not been loaded yet.");
        }
        return this.pages.get(pageID)!;
    }

    public async loadPage(pageID: number) {

        if (this.hasPageBeenLoadedOnceAlready(pageID)) return;

        switch (pageID) {
            case PageID.Home:
                this.pages.set(pageID, new (await import("./pages/Home.ts")).default());
                break;
            case PageID.About:
                this.pages.set(pageID, new (await import("./pages/About.ts")).default());
                break;
            case PageID.Blog:
                this.pages.set(pageID, new (await import("./pages/Blog.ts")).default());
                break;
            case PageID.Contact:
                this.pages.set(pageID, new (await import("./pages/Contact.ts")).default());
                break;
            case PageID.Unknown:
            default:
                throw new Error("Can not load this unknown page.");
        }

    }

    public hasPageBeenLoadedOnceAlready(page: number): boolean {
        return this.pages.has(page);
    }

}