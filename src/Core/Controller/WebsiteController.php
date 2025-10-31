<?php namespace Phro\Web\Core\Controller;

use GuzzleHttp\Psr7\Response;

class WebsiteController extends Controller {

    public function index(...$params): Response {
        return $this->render('index');
    }

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
