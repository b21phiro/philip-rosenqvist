<?php namespace Phro\Web;

use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
use Phro\Web\Http\Route;

class App {

    private Router $router;

    public function __construct() {
        $this->router = new Router();
    }

    public function handle(Request $request): Response {
       return $this->router->handle($request);
    }

    public function addRoute(Route $route): void {
        $this->router->addRoute($route);
    }

}