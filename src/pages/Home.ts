import type Page from "./Page.ts";

class Home implements Page {

    title: string = "Welcome";

    public mount(main: HTMLElement) {
        main.insertAdjacentHTML('afterbegin', '<h1>Home</h1>');
    }

}

export default Home;