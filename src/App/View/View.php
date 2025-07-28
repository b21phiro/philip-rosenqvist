<?php

namespace Phro\Web\App\View;

use GuzzleHttp\Psr7\Response;

class View {

    private string $template;

    public function __construct() {
        $this->template = __DIR__ . "/../View/templates/default.php";
    }

    public function render(int $code, string $filename, array $viewBag = []): Response {
        extract($viewBag);
        ob_start();
        include $this->template;
        $body = ob_get_clean();
        return new Response($code, [], $body);
    }

}