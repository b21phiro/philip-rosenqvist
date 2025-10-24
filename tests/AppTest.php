<?php

use PHPUnit\Framework\TestCase;
use Phro\Web\App;

class AppTest extends TestCase {

    public function testOutputHtmlOn200() {

        // Arrange.
        $request = $this->createStub(\GuzzleHttp\Psr7\Request::class);
        $request->method('getMethod')->willReturn('GET');
        $request->method('getUri')->willReturn(new \GuzzleHttp\Psr7\Uri('/'));

        $route = new \Phro\Web\Http\RouteGet("/", function() { echo "<!DOCTYPE html>"; });

        $router = new \Phro\Web\Http\Router();
        $router->addRoute($route);

        $app = new App($router);

        // Act.
        ob_start();
        $app->html($request);
        $output = ob_get_clean();

        // Assert.
        $this->assertStringContainsString('<!DOCTYPE html>', $output);

    }

    public function testOutputHtmlOn404() {

        // Arrange.
        $request = $this->createStub(\GuzzleHttp\Psr7\Request::class);
        $request->method('getMethod')->willReturn('GET');
        $request->method('getUri')->willReturn(new \GuzzleHttp\Psr7\Uri('/foo'));

        $router = new \Phro\Web\Http\Router();
        $app = new App($router);

        // Act.
        ob_start();
        $app->html($request);
        $output = ob_get_clean();

        $code = http_response_code();

        // Assert.
        $this->assertStringContainsString('<!DOCTYPE html>', $output);
        $this->assertEquals(404, $code);

    }

}