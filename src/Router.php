<?php namespace Phro\Web;

class Router {

    protected array $routes = [];

    public function __construct() {}

    public function addRoute(array ...$routes): void {
        foreach ($routes as $route) {
            if (!$this->findRoute($route['path'], $route['method'])) {
                $this->routes[] = $route;
            }
        }
    }

    public function getRoutes(): array {
        return $this->routes;
    }

    public function requestHandler(\GuzzleHttp\Psr7\Request $request): void {
        // 405
        $method = $request->getMethod();
        if (!$this->allowedMethod($method)) {
            $this->render(__DIR__ . '/View/Web/notFound.php', 405);
            return;
        }
        $route = $this->findRoute($request->getUri()->getPath(), $method);
        if (!$route) {
            $this->render(__DIR__ . '/View/Web/notFound.php', 404);
        } else {
            $this->render($route['handler']($request));
        }
    }

    protected function findRoute(string $path, string $method): array | null {
        return array_find($this->routes, function($route) use ($path, $method) {
            return $route['method'] == $method && $route['path'] == $path;
        });
    }

    protected function allowedMethod(string $method): bool {
        return in_array($method, ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);
    }

    protected function render(string $page, int $status = 200): void {
        ob_start();
        include $page;
        $html = ob_get_clean();
        echo $html;
        http_response_code($status);
    }

}