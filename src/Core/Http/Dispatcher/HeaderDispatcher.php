<?php

namespace Phro\Web\Core\Http\Dispatcher;

use Exception;
use GuzzleHttp\Psr7\Header;
use GuzzleHttp\Psr7\Response;

class HeaderDispatcher implements IHeaderDispatcher {

    private string $statusLine = "";

    /**
     * @throws Exception Headers already sent
     */
    function send(Response $response): void {
        if ($this->alreadySent()) {
            throw new Exception("Headers already sent");
        }
        $this->statusLine = sprintf('HTTP/%s %s %s',
            $response->getProtocolVersion(),
            $response->getStatusCode(),
            $response->getReasonPhrase()
        );
        header($this->statusLine);
        foreach ($response->getHeaders() as $header => $value) {
            $responseHeader = sprintf('%s: %s', $header, $response->getHeaderLine($header));
            header($responseHeader, FALSE);
        }
    }

    function alreadySent(): bool {
        return headers_sent();
    }

    function getStatusLine(): string {
        return $this->statusLine;
    }
}