<?php

use PHPUnit\Framework\TestCase;
use Phro\Web\Http\RouteGet;
use Phro\Web\Http\Router;

class RouterTest extends TestCase {

    public function testRouteFound() {
        // Arrange.
        $request = $this->createStub(\GuzzleHttp\Psr7\Request::class);
        $request->method('getMethod')->willReturn('GET');
        $request->method('getUri')->willReturn(new \GuzzleHttp\Psr7\Uri('/foo'));

        $route = new RouteGet("/foo", fn() => "Hello world!");

        $router = new Router();
        $router->addRoute($route);

        // Act.
        $router->requestHandler($request);
        $code = http_response_code();

        // Assert.
        $this->assertEquals(200, $code);

    }

    public function testPageNotFound() {
        // Arrange.
        $request = $this->createStub(\GuzzleHttp\Psr7\Request::class);
        $request->method('getMethod')->willReturn('GET');
        $request->method('getUri')->willReturn(new \GuzzleHttp\Psr7\Uri('/foo'));

        $router = new Router();

        // Act.
        $router->requestHandler($request);
        $code = http_response_code();

        // Assert.
        $this->assertEquals(404, $code);
    }

    public function testAddRoute() {
        // Arrange.
        $router = new Router();
        $route1 = new RouteGet("/", fn() => "");
        // Act.
        $router->addRoute($route1);
        $amount = count($router->getRoutes());
        // Assert.
        $this->assertEquals(1, $amount);
    }

    public function testAddDuplicateRoute() {
        // Arrange.
        $router = new Router();
        $route1 = new RouteGet("/", fn() => "");
        $route2 = $route1;
        // Act.
        $router->addRoute($route1, $route2);
        $amount = count($router->getRoutes());
        // Assert.
        $this->assertEquals(1, $amount);
    }

    public function testBadMethod() {
        // Arrange.
        $request = $this->createStub(\GuzzleHttp\Psr7\Request::class);
        $request->method('getMethod')->willReturn('NOT_A_METHOD');
        $request->method('getUri')->willReturn(new \GuzzleHttp\Psr7\Uri('/'));

        $route = new RouteGet("/", fn() => "");

        $router = new Router();
        $router->addRoute($route);

        // Act.
        $router->requestHandler($request);
        $code = http_response_code();

        // Assert.
        $this->assertEquals(405, $code);

    }
}
