<?php

use GuzzleHttp\Psr7\Response;
use Phro\Tests\Mocks\BodyDispatcherMock;
use Phro\Tests\Mocks\HeaderDispatcherMock;
use Phro\Web\Core\Http\Dispatcher\Dispatcher;

class DispatcherTest extends \PHPUnit\Framework\TestCase {

    function testShouldThrowExceptionWhenHeadersAlreadySent() {
        // Arrange.
        $headerDispatcher = new HeaderDispatcherMock();
        $response = new Response(200, ['text/html'], 'Hello world!', '1.1');
        // Act.
        $headerDispatcher->alreadySent = true;
        $dispatcher = new Dispatcher($headerDispatcher);
        // Assert.
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage("Headers already sent");
        $dispatcher->send($response);
        $this->assertCount(1, $headerDispatcher->getSentHeaders());
    }

    function testShouldSendStatusLineWhenResponseSent() {
        // Arrange.
        $headerDispatcher = new HeaderDispatcherMock();
        $response = new Response(200, ['text/html'], 'Hello world!', '1.1');
        // Act.
        $dispatcher = new Dispatcher($headerDispatcher);
        // Assert.
        $dispatcher->send($response);
        $this->assertCount(1, $headerDispatcher->getSentHeaders());
        $this->assertEquals('HTTP/1.1 200 OK', $headerDispatcher->getStatusLine());
    }

    function testShouldSendBodyWhenResponseHasBody() {
        // Arrange.
        $response = new Response(200, [], 'Hello world!');
        $headerDispatcher = new HeaderDispatcherMock();
        $bodyDispatcher = new BodyDispatcherMock();
        $dispatcher = new Dispatcher($headerDispatcher, $bodyDispatcher);
        // Act.
        $dispatcher->send($response);
        // Assert.
        $this->assertEquals('Hello world!', $bodyDispatcher->getSentBody());

    }

}