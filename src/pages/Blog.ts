import type Page from "./Page.ts";

class Blog implements Page {

    title: string = "My blog";

    public mount(main: HTMLElement) {
        main.insertAdjacentHTML('afterbegin', '<h1>My blog</h1>');
    }

}

export default Blog;