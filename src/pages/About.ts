import type Page from "./Page.ts";

class About implements Page {

    title: string = "About me";

    public mount(main: HTMLElement) {
        main.insertAdjacentHTML('afterbegin', '<h1>About me</h1>');
    }

}

export default About;