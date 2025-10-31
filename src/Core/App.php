<?php namespace Phro\Web\Core;

use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
use Phro\Web\Core\Http\Route\Route;

class App {

    private Router $router;

    public function __construct() {
        $this->router = new Router();
    }

    public function handle(Request $request): Response {
       return $this->router->handle($request);
    }

    public function addRoute(Route ...$routes): void {
        $this->router->addRoute(...$routes);
    }

}