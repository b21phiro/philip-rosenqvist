<?php namespace Phro\Web\Core\Http\Dispatcher;

use GuzzleHttp\Psr7\Response;

class BodyDispatcher implements IBodyDispatcher {

    public function send(Response $response): void {
        while (!$response->getBody()->eof()) {
            echo $response->getBody()->read(1024);
        }
    }

}
