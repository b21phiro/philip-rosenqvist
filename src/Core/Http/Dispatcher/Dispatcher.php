<?php namespace Phro\Web\Core\Http\Dispatcher;

use GuzzleHttp\Psr7\Response;

class Dispatcher {

    private IHeaderDispatcher $headerDispatcher;
    private IBodyDispatcher $bodyDispatcher;

    public function __construct(
            ?IHeaderDispatcher $headerDispatcher = new HeaderDispatcher,
            ?IBodyDispatcher $bodyDispatcher = new BodyDispatcher
    ) {
        $this->headerDispatcher = $headerDispatcher;
        $this->bodyDispatcher = $bodyDispatcher;
    }

    public function send(Response $response): void {
        $this->headerDispatcher->send($response);
        $this->bodyDispatcher->send($response);
    }

}