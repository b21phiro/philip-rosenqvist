<?php namespace Phro\Web\Core;

use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
use Phro\Web\Core\Http\Route\Route;

class Router {

    private array $routes = [];

    public function handle(Request $request): Response {
        try {
            $result = $this->findRoute($request);
            if (!$result) {
                return new Response(404, [], 'Not found');
            }
            return $this->callRouteHandler($result);
        } catch (\Exception $exception) {
            return new Response(500, [], '<h1>Internal server error</h1>');
        }

    }

    public function addRoute(Route ...$routes): void {
        $newRoutes = array_filter($routes, fn(Route $route) => !$this->isRoute($route));
        $this->routes = array_merge($this->routes, $newRoutes);
    }

    public function getRoutes(): array {
        return $this->routes;
    }

    protected function callRouteHandler(array $result): Response {
        $route = $result[0];
        $args = array_map(function($arg) {
            if (filter_var($arg, FILTER_VALIDATE_INT)) {
                return (int) $arg;
            } else {
                return $arg;
            }
        }, $result[1]);
        $handler = $route->getHandler();
        if (is_callable($handler)) {
            return $handler(...$args);
        }
        $controllerName = $route->getHandler()[0];
        $controller = new $controllerName;
        $controllerMethod = $route->getHandler()[1];
        return call_user_func_array([new $controller, $controllerMethod], [...$args]);
    }

    protected function findRoute(Request $request): array | null {
        $result = [];
        for ($i = 0; $i < count($this->routes); ++$i) {
            $route = $this->routes[$i];
            if ($route->getMethod() !== $request->getMethod()) continue;
            if ($params = $route->getParams()) {
                $path = $route->getPath();
                $pattern = preg_quote($path, '/');
                foreach ($params as $param => $type) {
                    if ($type === 'int') {
                        $pattern = str_replace('\:'.$param, '(\d+)', $pattern);
                    } else if ($type === 'string') {
                        $pattern = str_replace('\:'.$param, '(\w+)', $pattern);
                    }
                }
                if (preg_match('/^'.$pattern.'$/i', $request->getUri()->getPath(), $matches)) {
                    $result = [$route, array_slice($matches, 1)];
                    break;
                }
            } else if ($route->getPath() === $request->getUri()->getPath()) {
                $result = [$route, []];
                break;
            }
        }
        return $result;
    }

    protected function isRoute(Route $route): Route | null {
        return array_find($this->routes,
            fn(Route $r) =>
                $r->getPath() === $route->getPath() &&
                $r->getMethod() === $route->getMethod()
        );
    }

}
