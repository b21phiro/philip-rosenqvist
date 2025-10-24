<?php namespace Phro\Web\Http;

abstract class Route {

    public string $path;
    public string $method;
    public mixed $handler;

    public function __construct(string $path, string $method, mixed $handler) {
        $this->path = $path;
        $this->method = $method;
        $this->handler = $handler;
    }

    public function isPath(string $path): bool {
        return preg_match('#^'.preg_quote($this->path, '#').'$#i', $path);
    }

    public function isMethod(string $method): bool {
        return $this->method === strtoupper(trim($method));
    }

}