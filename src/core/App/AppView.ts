import Header from "../layout/header.ts";
import Footer from "../layout/footer.ts";
import AppRoute from "./AppRoute.ts";

class AppView {

    private pageContainer: HTMLElement;
    private readonly baseTitle: string;

    constructor(root: HTMLElement, baseTitle: string) {
        root.insertAdjacentHTML('afterbegin', `
            ${Header()}
            <main id="main"></main>
            ${Footer()}
        `);
        this.pageContainer = root.querySelector('#main')!;
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
        this.clearPage();
        this.pageContainer.innerHTML = page;
    }

    private clearPage(): void {
        while (this.pageContainer.firstChild) {
            this.pageContainer.removeChild(this.pageContainer.firstChild);
        }
    }

}

export default AppView;