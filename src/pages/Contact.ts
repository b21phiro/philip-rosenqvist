import type Page from "./Page.ts";

class Contact implements Page {

    public mount(main: HTMLElement) {
        main.insertAdjacentHTML('afterbegin', '<h1>Contact me</h1>');
    }

}

export default Contact;