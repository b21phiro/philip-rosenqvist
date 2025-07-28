<?php

namespace Phro\Web\App;

use GuzzleHttp\Psr7\Request;
use Phro\Web\App\View\View;

class App {

    private Router $router;

    public function __construct() {
        $view = new View();
        $dispatcher = new Dispatcher($view);
        $this->router = new Router($dispatcher);
    }

    public function run(Request $request): void {
        $this->router->handler($request);
    }

}