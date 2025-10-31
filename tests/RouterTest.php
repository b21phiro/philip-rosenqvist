<?php

use PHPUnit\Framework\TestCase;

use Phro\Web\Controller\Controller;
use Phro\Web\Router;
use Phro\Web\Http\GetRoute;

class StubController extends Controller {
    public function book(int $id): \GuzzleHttp\Psr7\Response {
        return new \GuzzleHttp\Psr7\Response(200, [], 'Book '.$id);
    }
}

class RouterTest extends TestCase {

    function testShouldIncreaseTheAmountOfRoutesWhenAddingNewRoute() {
        // Arrange.
        $router = new Router();
        $route1 = new GetRoute('/foo', [StubController::class, 'book']);
        $route2 = new GetRoute('/bar', [StubController::class, 'book']);
        // Act.
        $router->addRoute($route1);
        $router->addRoute($route2);
        $actual = $router->getRoutes();
        // Assert.
        $this->assertCount(2, $actual);
    }

    function testShouldNotAddDuplicatedRoutesWhenAddingAnEqualRoute() {
        // Arrange.
        $router = new Router();
        $route1 = new GetRoute('/foo', [StubController::class, 'book']);
        $route2 = $route1;
        // Act.
        $router->addRoute($route1);
        $router->addRoute($route2);
        // Assert.
        $this->assertCount(1, $router->getRoutes());
    }

    function testShouldNotReplacePreviouslyAddedRoutesWhenAddingMultipleRoutes() {
        // Arrange.
        $router = new Router();
        $route1 = new GetRoute('/foo', [StubController::class, 'book']);
        $route2 = new GetRoute('/bar', [StubController::class, 'book']);
        // Act.
        $router->addRoute($route1, $route2);
        // Assert.
        $this->assertCount(2, $router->getRoutes());
    }

    function testShouldReturnSpecificResourceWhenRequestedHitsPathVariables() {
        // Arrange.
        $request = new \GuzzleHttp\Psr7\Request('GET', '/blog/post/1', [], null, '1.1');
        $route = new GetRoute('/blog/post/:id', [StubController::class, 'book'], ['id' => 'int']);
        $router = new Router();
        $router->addRoute($route);
        // Act.
        $response = $router->handle($request);
        // Assert.
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Book 1', $response->getBody()->getContents());
    }

}