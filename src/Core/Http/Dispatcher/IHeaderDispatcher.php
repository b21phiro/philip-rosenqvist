<?php namespace Phro\Web\Core\Http\Dispatcher;

use GuzzleHttp\Psr7\Header;
use GuzzleHttp\Psr7\Response;

interface IHeaderDispatcher {
    function send(Response $response): void;
    function alreadySent(): bool;
    function getStatusLine(): string;
}