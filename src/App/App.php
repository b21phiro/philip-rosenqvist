<?php

namespace Phro\Web\App;

use GuzzleHttp\Psr7\Request;

class App {

    private Router $router;

    public function __construct() {
        $this->router = new Router();
    }

    public function run(Request $request): void {
        $this->router->handler($request);
    }

}