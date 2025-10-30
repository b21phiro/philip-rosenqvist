<?php namespace Phro\Web;

use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
use Phro\Web\Http\Route;

class App {

    private array $routes = [];

    public function handle(Request $request): Response {
        try {
            $route = $this->findRoute($request);
            if (!$route) {
                return new Response(404, [], 'Not found');
            }
            return $this->callRouteHandler($route);
        } catch (\Exception $exception) {
            return new Response(500, [], '<h1>Internal server error</h1>');
        }

    }

    public function addRoute(Route $route): void {
        $this->routes[] = $route;
    }

    protected function callRouteHandler(Route $route): Response {
        $controllerName = $route->getHandler()[0];
        $controller = new $controllerName;
        $controllerMethod = $route->getHandler()[1];
        return call_user_func_array([new $controller, $controllerMethod], []);
    }

    protected function findRoute(Request $request): Route | null {
        return array_find($this->routes, fn(Route $r)
            => $r->getPath() === $request->getUri()->getPath()
            && $r->getMethod() === $request->getMethod()
        );
    }

}