<?php namespace Phro\Web\Http;

abstract class Route {

    protected string $method;
    protected string $path;
    protected array $handler;

    public function __construct(string $method, string $path, array $handler) {
        $this->method = $method;
        $this->path = $path;
        $this->handler = $handler;
    }

    public function getMethod(): string {
        return $this->method;
    }

    public function getPath(): string {
        return $this->path;
    }

    public function getHandler(): array {
        return $this->handler;
    }

}