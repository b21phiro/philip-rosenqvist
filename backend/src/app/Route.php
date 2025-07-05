<?php

namespace Phro\Web;

class Route {

    private string $pattern;
    private string $method;
    private array $action;

    public function __construct(string $method, string $pattern, array $action) {
        $this->method = $method;
        $this->pattern = $pattern;
        $this->action = $action;
    }

    public function matchPath(string $path): bool {
        $pathWithoutQueryString = preg_replace('/\?.+|\#.+/', '', $path);
        return preg_match('/'.$this->pattern.'/', $pathWithoutQueryString);
    }

    public function matchMethod(string $method): bool {
        return $this->method === $method;
    }

    public function match(string $method, string $path): bool {
        return $this->matchPath($path) && $this->matchMethod($method);
    }

    public function getAction(): array {
        return $this->action;
    }


}