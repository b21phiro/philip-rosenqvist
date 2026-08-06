import Header from "../layout/header.ts";
import Footer from "../layout/footer.ts";
import AppRoute from "./AppRoute.ts";

class AppView {

    private readonly baseTitle: string;

    constructor(root: HTMLElement, baseTitle: string) {
        root.insertAdjacentHTML('afterbegin', `
            ${Header()}
            <main id="main"></main>
            ${Footer()}
        `);
        this.baseTitle = baseTitle;
    }

    public render(route: AppRoute): void {
        this.updatePage(route.controller());
        this.setDocTitle(route.title);
    }

    public setDocTitle(title: string): void {
        document.title = (this.baseTitle) ? `${title} | ${this.baseTitle}` : title;
    }

    private updatePage(page: string): void {
        document.getElementById('main')!.innerHTML = page;
    }

}

export default AppView;