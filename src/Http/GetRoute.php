<?php namespace Phro\Web\Http;

class GetRoute extends Route {
    public function __construct(string $path, array $handler) {
        parent::__construct('GET', $path, $handler);
    }
}

