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

    public function match(Request $request): array {

        if (!$this->isMethod($request->getMethod())) {
            return [];
        }

        $match = $this->isPath($request->getUri()->getPath());

        if (!$match) {
            return [];
        }

        $action = $this->action;

        $i = 0;
        foreach ($this->params as $key => $type) {
            $i++;
            $arg = $match[$i];
            if ($type === 'int' && is_numeric($arg)) {
                $action[2][$key] = (int) $arg;
            } else {
                $action[2][$key] = $arg;
            }
        }

        return $action;
    }

    private function isPath(string $path): array {
       preg_match($this->pathPattern, $path, $matches);
       return $matches;
    }

    private function isMethod(string $method): bool {
        return $this->method === $method;
    }

    private function createPathPattern(string $path, array $params = []): string {
        $pattern = preg_replace_callback('/:\w+/', fn($matches) => $this->setArgumentPattern($matches[0], $params), $path);
        $pattern = preg_replace('/\/?$/', '', $pattern);
        return '#^' . $pattern . '\/?$#';
    }

    private function setArgumentPattern(string $arg, array $params = []): string {
        $key = str_replace(':', '', $arg);
        return match ($params[$key] ?? '') {
            'int' => '(\d+)',
            default => '(\w+)',
        };
    }

}