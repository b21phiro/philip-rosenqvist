<?php

use PHPUnit\Framework\TestCase;

class RouteTest extends TestCase
{

    public function testPathMatch() {
        // Arrange.
        $route = new \Phro\Web\Http\RouteGet("/foo", fn() => "Hello world");
        // Act.
        $isPath = $route->isPath('/Foo');
        // Assert.
        $this->assertTrue($isPath);
    }

    public function testMethodMatch() {
        // Arrange.
        $route = new \Phro\Web\Http\RouteGet("/foo", fn() => "Hello world");
        // Act.
        $isMethod = $route->isMethod('GeT');
        // Assert.
        $this->assertTrue($isMethod);
    }

}