import AppRoutes from "./AppRoutes.ts";
import AppRoute from "./AppRoute.ts";

export default class AppRouter {

    private routes: AppRoutes;

    public constructor(routes: AppRoutes) {
        this.routes = routes;
    }

    public findRoute(request: Location): AppRoute | undefined {
        return this.routes.find((route: AppRoute): boolean => route.path === request.pathname);
    }

}