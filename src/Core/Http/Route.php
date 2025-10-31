<?php namespace Phro\Web\Core\Http;

abstract class Route {

    protected string $method;
    protected string $path;
    protected mixed $handler;
    protected array $params;

    public function __construct(string $method, string $path, mixed $handler, array $params = []) {
        $this->method = $method;
        $this->path = $path;
        $this->handler = $handler;
        $this->params = $params;
    }

    public function getMethod(): string {
        return $this->method;
    }

    public function getPath(): string {
        return $this->path;
    }

    public function getHandler(): mixed {
        return $this->handler;
    }

    public function getParams(): array {
        return $this->params;
    }

}