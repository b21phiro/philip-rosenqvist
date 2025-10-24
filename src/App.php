<?php namespace Phro\Web;

use GuzzleHttp\Psr7\Request;
use Phro\Web\Http\Router;

class App {

    protected Router $router;

    public function __construct(Router $router) {
        $this->router = $router;
    }

    public function html(Request $request): void {
        $this->router->requestHandler($request);
    }

}