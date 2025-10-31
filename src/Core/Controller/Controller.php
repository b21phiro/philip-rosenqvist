<?php namespace Phro\Web\Core\Controller;

use GuzzleHttp\Psr7\Response;

abstract class Controller {
    public abstract function index(mixed ...$params): Response;

    protected function render(string $page): Response {
        $this->appendToStr(".php", $page);
        ob_start();
        include __DIR__ . "/../../recourses/views/" . $page;
        $html = ob_get_clean();
        return new Response(200, [], $html);
    }

    private function appendToStr(string $appendant, string & $strSubject): void {
        if (str_ends_with($strSubject, $appendant)) {
            return;
        }
        $strSubject .= $appendant;
    }

}