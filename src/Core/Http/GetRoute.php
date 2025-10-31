<?php namespace Phro\Web\Core\Http;

class GetRoute extends Route {
    public function __construct(string $path, mixed $handler, array $params = []) {
        parent::__construct('GET', $path, $handler, $params);
    }
}

