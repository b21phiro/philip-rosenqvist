<?php namespace Phro\Web\Core\Http\Dispatcher;

use GuzzleHttp\Psr7\Response;

interface IBodyDispatcher {
    public function send(Response $response): void;
}

