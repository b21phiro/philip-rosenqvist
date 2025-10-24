<?php namespace Phro\Web;

use GuzzleHttp\Psr7\Request;

class App {

    public function __construct() {}

    public function html(Request $request): void {
        if ($request->getUri()->getPath() === '/') {
            $this->render(__DIR__ . '/View/Web/index.php');
        } else {
            $this->render(__DIR__ . '/View/Web/notFound.php', 404);
        }
    }

    protected function render(string $page, int $status = 200): void {
        ob_start();
        include $page;
        $html = ob_get_clean();
        echo $html;
        http_response_code($status);
    }

}