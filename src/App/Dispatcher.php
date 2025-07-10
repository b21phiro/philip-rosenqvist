<?php

namespace Phro\Web\App;

use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;

class Dispatcher {

    public function __construct() {}

    public function handler(Request $request, array $action): void {
        if (!$action) {
            $response = new Response(404);
        } else {
            $controller = new $action[0]();
            $controller->setRequest($request);
            $method = $action[1];
            $args = $action[2] ?? [];
            $handler = fn() => call_user_func_array([$controller, $method], $args);
            $response = $handler() ?? new Response();
        }
        $this->send($response);
    }

    public function send(Response $response): void
    {
        // Check if headers are already sent
        if (!headers_sent()) {
            // Send the status line (e.g., "HTTP/1.1 200 OK")
            $statusCode = $response->getStatusCode();
            $reasonPhrase = $response->getReasonPhrase();
            $protocolVersion = $response->getProtocolVersion();
            header(sprintf('HTTP/%s %d %s', $protocolVersion, $statusCode, $reasonPhrase), true, $statusCode);

            // Send headers
            foreach ($response->getHeaders() as $name => $values) {
                foreach ($values as $value) {
                    header(sprintf('%s: %s', $name, $value), false);
                }
            }
        }

        // Send the body
        $body = $response->getBody();
        if ($body->isSeekable()) {
            $body->rewind();
        }

        while (!$body->eof()) {
            echo $body->read(8192);
        }
    }


}