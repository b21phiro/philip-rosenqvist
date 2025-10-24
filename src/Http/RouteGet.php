<?php namespace Phro\Web\Http;

class RouteGet extends Route {

    public function __construct(string $path, mixed $handler) {
        parent::__construct($path, "GET", $handler);
    }

}
