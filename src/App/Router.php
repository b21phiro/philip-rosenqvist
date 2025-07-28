<?php

namespace Phro\Web\App;

use GuzzleHttp\Psr7\Request;
use Phro\Web\App\Controller\LoginController;
use Phro\Web\App\Controller\WebController;

class Router {

    private array $routes;
    private Dispatcher $dispatcher;

    public function __construct(Dispatcher $dispatcher) {

        # This object handles sending the response to client.
        $this->dispatcher = $dispatcher;

        # Registered routes.
        $this->routes = [
            new Route('GET', '/', [WebController::class, 'index']),
            new Route('GET', '/login', [LoginController::class, 'index']),
        ];

    }

    public function handler(Request $request): void {
        $action = $this->match($request);
        $this->dispatcher->handler($request, $action);
    }

    public function match(Request $request): array {
        foreach ($this->routes as $route) {
           $action = $route->match($request);
           if ($action) {
               return $action;
           }
        }
        return [];
    }

}