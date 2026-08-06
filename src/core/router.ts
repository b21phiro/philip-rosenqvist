import Route from "./route.ts";

export default class Router {

    private routes: Array<Route> = [];

    public constructor(routes: Array<Route>) {
        this.routes = routes;
    }

    public match(request: Location): Route | void {
        return this.routes.find((route: Route): boolean => route.path === request.pathname);
    }

}