<?php

namespace Phro\Web;

class Router {

    private array $routes;

    public function __construct() {
        $this->routes = [
            new Route('GET','^\/api$', [Controller::class, 'index']),
        ];
    }

    public function match(string $method, string $uri): Route | null {
        return array_find($this->routes, fn($route): bool => $route->match($method, $uri));
    }


}