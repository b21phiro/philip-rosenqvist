<?php

namespace Phro\Tests\Mocks;

use GuzzleHttp\Psr7\Response;
use Phro\Web\Core\Http\Dispatcher\IBodyDispatcher;

class BodyDispatcherMock implements IBodyDispatcher {

    private string $body = "";

    public function send(Response $response): void {
        while (!$response->getBody()->eof()) {
            $this->body .= $response->getBody()->read(1024);
        }
    }

    public function getSentBody(): string {
        return $this->body;
    }

}