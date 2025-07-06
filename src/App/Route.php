<?php

namespace Phro\Web\App;

use GuzzleHttp\Psr7\Request;

class Route {

    private string $method;
    private string $path;
    private array $action;
    private array $params;
    private string $pathPattern;

    public function __construct(string $method, string $path, array $action, array $params = []) {
        $this->method = $method;
        $this->path = $path;
        $this->action = $action;
        $this->params = $params;
        $this->pathPattern = $this->createPathPattern($path, $params);
    }

    public function match(Request $request): bool {
        return $this->isMethod($request->getMethod()) && $this->isPath($request->getUri()->getPath());
    }

    private function isPath(string $path): bool {
        $cleanPath = preg_replace('/\?.+|#.+|\/$/', '', $path);
        return preg_match($this->pathPattern, $cleanPath) === 1;
    }

    private function isMethod(string $method): bool {
        return $this->method === $method;
    }

    private function createPathPattern(string $path, array $params = []): string {
        $pattern = preg_replace_callback('/:\w+/', fn($matches) => $this->setArgumentPattern($matches[0], $params), $path);
        $pattern = preg_replace('/\/?$/', '', $pattern);
        return '#^' . $pattern . '$#';
    }

    private function setArgumentPattern(string $arg, array $params = []): string {
        $key = str_replace(':', '', $arg);
        return match ($params[$key] ?? '') {
            'int' => '\d+',
            default => '\w+',
        };
    }

}