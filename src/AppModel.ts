import type AppView from "./AppView.ts";
import type Page from "./pages/Page.ts";
import PageEnums from "./pages/PageEnums.ts";

import Home from "./pages/Home.ts";

export default class AppModel {

    private view: AppView;

    private pages: Map<number, Page>;
    private titles: Map<number, string>;

    public constructor(view: AppView) {
        this.view = view;

        // Pre-initialized and cached pages.
        this.pages = new Map([
            [PageEnums.Home, new Home()]
        ]);

        // I get the title before the page has been loaded for better UX.
        this.titles = new Map([
            [PageEnums.Home, "Welcome"],
            [PageEnums.About, "About me"],
            [PageEnums.Blog, "My blog"],
            [PageEnums.Contact, "Contact"],
        ]);

    }

    public async setCurrentPage(pageNumber: number): Promise<void> {
        this.view.showLoading();
        this.setDocTitle(this.titles.get(pageNumber) ?? "Not found");
        const page = await this.getAndMaybeInitPage(pageNumber);
        this.view.showPage(page);
    }

    public setDocTitle(title: string): void {
        document.title = `${title} | Philip Rosenqvist`;
    }

    private async getAndMaybeInitPage(page: number): Promise<Page> {
        if (!this.hasPageBeenInitialized(page)) {
            this.pages.set(page, await this.createPageInstance(page));
        }
        return this.getPage(page);
    }

    private hasPageBeenInitialized(page: number): boolean {
        return this.pages.has(page);
    }

    private async createPageInstance(page: number): Promise<Page> {
        if (page === PageEnums.Home) {
            return new Home();
        } else if (page === PageEnums.About) {
            const About = (await import("./pages/About.ts")).default;
            return new About();
        } else if (page === PageEnums.Blog) {
            const Blog = (await import("./pages/Blog.ts")).default;
            return new Blog();
        } else if (page === PageEnums.Contact) {
            const Contact = (await import("./pages/Contact.ts")).default;
            return new Contact();
        } else {
            throw new Error(`Can not init unknown page: ${page}`);
        }
    }

    private getPage(page: number): Page {
        if (!this.hasPageBeenInitialized(page)) {
            throw new Error(`Page does not exist or have yet been initialized: ${page}`);
        }
        return this.pages.get(page)!;
    }

}