export default class Route {

    public path: string;
    public view: () => string;
    public options?: { title: string };

    constructor(path: string, view: () => string, options: { title: string }) {
        this.path = path;
        this.view = view;
        this.options = options;
    }

}