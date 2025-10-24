<?php

use Phro\Web\App;
use PHPUnit\Framework\TestCase;

class AppTest extends TestCase {

    public function testOutputHtmlOn200() {

        // Arrange.
        $request = $this->createStub(\GuzzleHttp\Psr7\Request::class);
        $request->method('getMethod')->willReturn('GET');
        $request->method('getUri')->willReturn(new \GuzzleHttp\Psr7\Uri('/'));

        $app = new App();

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
        $request->method('getUri')->willReturn(new \GuzzleHttp\Psr7\Uri('TEST_THIS_IS_NOT_A_REAL_URL'));

        $app = new App();

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