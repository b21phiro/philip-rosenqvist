<?php namespace Phro\Web;

use GuzzleHttp\Psr7\Request;

class App {

    public function __construct() {}

    public function html(Request $request): void {
        if ($request->getUri()->getPath() === '/') {
            $pageFile = __DIR__ . '/View/Web/index.php';
            ob_start();
            include $pageFile;
            $html = ob_get_clean();
            echo $html;
        } else {
            $pageFile = __DIR__ . '/View/Web/notFound.php';
            ob_start();
            include $pageFile;
            $html = ob_get_clean();
            echo $html;
            http_response_code(404);
        }

    }

}