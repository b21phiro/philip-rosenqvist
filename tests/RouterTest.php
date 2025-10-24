<?php

use Phro\Web\Router;
use PHPUnit\Framework\TestCase;

class RouterTest extends TestCase {

    public function testFoundPage() {
        // Arrange.
        $request = $this->createStub(\GuzzleHttp\Psr7\Request::class);
        $request->method('getMethod')->willReturn('GET');
        $request->method('getUri')->willReturn(new \GuzzleHttp\Psr7\Uri('/'));

        $router = new Router();
        $router->addRoute(
            ["path" => "/", "method" => "GET", "handler" => fn() => __DIR__ . '/../src/View/Web/index.php']
        );

        // Act.
        ob_start();
        $router->requestHandler($request);
        $response = ob_get_clean();
        $code = http_response_code();

        // Assert.
        $this->assertStringContainsString('<!DOCTYPE html>', $response);
        $this->assertEquals(200, $code);

    }

    public function testPageNotFound() {
        // Arrange.
        $request = $this->createStub(\GuzzleHttp\Psr7\Request::class);
        $request->method('getMethod')->willReturn('GET');
        $request->method('getUri')->willReturn(new \GuzzleHttp\Psr7\Uri('TEST_THIS_IS_NOT_A_REAL_URL'));

        $router = new Router();

        // Act.
        ob_start();
        $router->requestHandler($request);
        $response = ob_get_clean();
        $code = http_response_code();

        // Assert.
        $this->assertStringContainsString('<!DOCTYPE html>', $response);
        $this->assertEquals(404, $code);
    }

    public function testAddRoute() {
        // Arrange.
        $router = new Router();
        // Act.
        $router->addRoute(["path" => "/", "method" => "GET", "handler" => fn() => "<!DOCTYPE html>"]);
        $amount = count($router->getRoutes());
        // Assert.
        $this->assertEquals(1, $amount);
    }

    public function testAddDuplicateRoute() {
        // Arrange.
        $router = new Router();
        // Act.
        $router->addRoute(
            ["path" => "/", "method" => "GET", "handler" => fn() => ""],
            ["path" => "/", "method" => "GET", "handler" => fn() => ""]
        );
        $amount = count($router->getRoutes());
        // Assert.
        $this->assertEquals(1, $amount);
    }

    public function testBadMethod() {
        // Arrange.
        $request = $this->createStub(\GuzzleHttp\Psr7\Request::class);
        $request->method('getMethod')->willReturn('POOP');
        $request->method('getUri')->willReturn(new \GuzzleHttp\Psr7\Uri('/'));

        $router = new Router();
        $router->addRoute(
            ["path" => "/", "method" => "GET", "handler" => fn() => ""]
        );

        // Act.
        ob_start();
        $router->requestHandler($request);
        $response = ob_get_clean();
        $code = http_response_code();

        // Assert.
        $this->assertStringContainsString('<!DOCTYPE html>', $response);
        $this->assertEquals(405, $code);

    }
}
