import Page from "./pages/Page.ts";

export default class AppView {

    constructor(root: HTMLElement) {
        root.insertAdjacentHTML('afterbegin', `
            <header>
                <nav>
                    <a href="/philip-rosenqvist/">Home</a>
                    <a href="/philip-rosenqvist/about">About</a>
                    <a href="/philip-rosenqvist/blog">blog</a>
                    <a href="/philip-rosenqvist/contact">Contact</a>
                </nav>
            </header>
            <main id="page"></main>
            <footer>footer</footer>
        `);
    }

    public showPage(page: Page) {
        const main = this.getMainElement();
        main.innerHTML = "";
        page.mount(main);
    }

    public showLoading() {
        const main = this.getMainElement();
        main.innerHTML = "<div>Loading...</div>";
    }

    private getMainElement(): HTMLElement {
        const main = document.getElementById('page');
        if (!main) {
            throw new Error('Page element not found');
        }
        return main;
    }

}