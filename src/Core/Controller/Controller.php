<?php namespace Phro\Web\Core\Controller;

use GuzzleHttp\Psr7\Response;
use Phro\Web\Core\Utils;

abstract class Controller {
    public abstract function index(mixed ...$params): Response;

    protected function render(string $page): Response {
        Utils::appendToStr(".php", $page);
        ob_start();
        include __DIR__ . "/../../recourses/views/" . $page;
        $html = ob_get_clean();
        return new Response(200, [], $html);
    }

}