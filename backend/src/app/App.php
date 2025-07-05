<?php

namespace Phro\Web\App;

class App {

    private Router $router;
    private Dispatcher $dispatcher;

    public function __construct() {
        $this->router = new Router();
        $this->dispatcher = new Dispatcher();
    }

    public function run(): void {
        $route = $this->router->match($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
        $this->dispatcher->routeHandler($_SERVER, $route);
    }

}