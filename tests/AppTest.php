<?php

use PHPUnit\Framework\TestCase;
use Phro\Web\Core\App;
use Phro\Web\Core\Controller\WebsiteController;
use Phro\Web\Core\Http\Route\Route;

class AppTest extends TestCase {

    function testShouldReturnPsr7ResponseWhenRequestWasHandled() {
        // Arrange.
        $request = new \GuzzleHttp\Psr7\Request('GET', '/foo', [], null, '1.1');
        $app = new App();
        $route = $this->createMock(Route::class);
        $route->method('getPath')->willReturn('/foo');
        $route->method('getMethod')->willReturn('GET');
        $route->method('getHandler')->willReturn([WebsiteController::class, 'index']);
        $app->addRoute($route);
        // Act.
        $response = $app->handle($request);
        // Assert.
        $this->assertEquals(200, $response->getStatusCode());
    }

    function testShouldReturn404ResponseWhenRouteWasNotFound() {
        // Arrange.
        $request = new \GuzzleHttp\Psr7\Request('GET', '/foo', [], null, '1.1');
        $app = new App();
        // Act.
        $response = $app->handle($request);
        // Assert.
        $this->assertEquals(404, $response->getStatusCode());
    }

    function testShouldReturn500ResponseWhenAnErrorOccurred() {
        // Arrange.
        $request = new \GuzzleHttp\Psr7\Request('GET', '/foo', [], null, '1.1');
        $app = new App();
        $route = $this->createMock(Route::class);
        $route->method('getPath')->willReturn('/foo');
        $route->method('getMethod')->willReturn('GET');
        $route->method('getHandler')->willThrowException(new \Exception('Internal server error', 500));
        $app->addRoute($route);
        // Act.
        $response = $app->handle($request);
        // Assert.
        $this->assertEquals(500, $response->getStatusCode());
    }

}