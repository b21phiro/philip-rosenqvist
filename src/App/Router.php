<?php

namespace Phro\Web\App;

use GuzzleHttp\Psr7\Request;
use Phro\Web\App\Controller\AdminController;
use Phro\Web\App\Controller\BlogController;
use Phro\Web\App\Controller\Controller;
use Phro\Web\App\Controller\LoginController;
use Phro\Web\App\Controller\WebController;

class Router {

    private array $routes;

    public function __construct() {
        $this->routes = [
            new Route('GET', '/', [WebController::class, 'index']),
            new Route('GET', '/admin', [AdminController::class, 'index']),
            new Route('GET', '/blog/:id', [BlogController::class, 'post'], ['id' => 'int']),
            new Route('GET', '/login', [LoginController::class, 'index']),
        ];
    }

    public function handler(Request $request): void {
        $controller = $this->match($request);
    }

    public function match(Request $request): Controller {
        $route = array_find($this->routes, fn($route) => $route->match($request));
        var_dump($route);
    }

}