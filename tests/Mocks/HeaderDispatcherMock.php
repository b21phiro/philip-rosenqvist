<?php namespace Phro\Tests\Mocks;

use Exception;
use GuzzleHttp\Psr7\Response;
use Phro\Web\Core\Http\Dispatcher\IHeaderDispatcher;

class HeaderDispatcherMock implements IHeaderDispatcher {
    private array $sentHeaders = [];
    public bool $alreadySent = false;
    public string $statusLine = "";

    /**
     * @throws Exception
     */
    public function send(Response $response): void {
        if ($this->alreadySent) {
            throw new Exception("Headers already sent");
        }
        $this->statusLine = sprintf('HTTP/%s %s %s',
            $response->getProtocolVersion(),
            $response->getStatusCode(),
            $response->getReasonPhrase()
        );
        $this->sentHeaders = array_merge($this->sentHeaders, $response->getHeaders());
    }

    public function getSentHeaders(): array {
        return $this->sentHeaders;
    }

    public function alreadySent(): bool {
        return $this->alreadySent;
    }

    public function getStatusLine(): string {
       return $this->statusLine;
    }

}
