<?php namespace Phro\Web;

use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
use Phro\Web\Http\Route;

class App {

    private array $routes = [];

    public function handle(Request $request): Response {
        try {
            $route = array_find(
                $this->routes,
                fn($route) =>
                    $route->getPath() === $request->getUri()->getPath() &&
                    $route->getMethod() === $request->getMethod()
            );
            if (!$route) {
                return new Response(404, [], 'Not found');
            }
            $controller = $route->getHandler()[0];
            $action = $route->getHandler()[1];
            $response = call_user_func_array([new $controller, $action], []);
            return $response;
        } catch (\Exception $exception) {
            return new Response(500, [], 'Internal server error');
        }

    }

    public function addRoute(Route $route): void {
        $this->routes[] = $route;
    }

}