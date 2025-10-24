<?php namespace Phro\Web\Http;

class Router {

    protected array $routes = [];
    protected mixed $customMethodNotAllowedHandler;

    public function __construct() {}

    public function addRoute(Route ...$routes): void {
        foreach ($routes as $route) {
            if (!$this->findRoute($route->path, $route->method)) {
                $this->routes[] = $route;
            }
        }
    }

    public function getRoutes(): array {
        return $this->routes;
    }

    public function requestHandler(\GuzzleHttp\Psr7\Request $request): void {
        $method = $request->getMethod();
        if (!$this->allowedMethod($method)) {
            $this->methodNotAllowedHandler();
            return;
        }
        $route = $this->findRoute($request->getUri()->getPath(), $method);
        if (!$route) {
            $this->notFoundHandler();
            return;
        }
        call_user_func($route->handler);
        http_response_code(200);
    }

    protected function findRoute(string $path, string $method): Route | null {
        return array_find($this->routes, fn($route) => $route->isPath($path) && $route->isMethod($method));
    }

    protected function allowedMethod(string $method): bool {
        return in_array($method, ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);
    }

    protected function methodNotAllowedHandler(): void {
        ob_start();
        include __DIR__ . '/../View/Web/notFound.php';
        echo ob_get_clean();
        http_response_code(405);
    }

    protected function notFoundHandler(): void {
        ob_start();
        include __DIR__ . '/../View/Web/notFound.php';
        echo ob_get_clean();
        http_response_code(404);
    }

}