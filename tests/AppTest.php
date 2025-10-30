<?php

use PHPUnit\Framework\TestCase;

use Phro\Web\App;
use Phro\Web\Controller\Controller;
use Phro\Web\Controller\WebsiteController;
use Phro\Web\Controller\BookController;
use Phro\Web\Http\GetRoute;
use Phro\Web\Http\Route;

class StubController extends Controller {
    public function book(int $id): \GuzzleHttp\Psr7\Response {
        return new \GuzzleHttp\Psr7\Response(200, [], 'Book '.$id);
    }
}

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

    function testShouldReturnSpecificResourceWhenRequestedHitsPathVariables() {
        // Arrange.
        $request = new \GuzzleHttp\Psr7\Request('GET', '/blog/post/1', [], null, '1.1');
        $route = new GetRoute('/blog/post/:id', [StubController::class, 'book'], ['id' => 'int']);
        $app = new App();
        $app->addRoute($route);
        // Act.
        $response = $app->handle($request);
        // Assert.
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Book 1', $response->getBody()->getContents());
    }

}