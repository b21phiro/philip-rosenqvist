import type Page from "./Page.ts";

class Blog implements Page {

    public mount(main: HTMLElement) {
        main.insertAdjacentHTML('afterbegin', '<h1>My blog</h1>');
    }

}

export default Blog;