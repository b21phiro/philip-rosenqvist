<?php namespace Phro\Web\Core\Controller;

use GuzzleHttp\Psr7\Response;

class WebsiteController extends Controller {

    public function index(...$params): Response {
        return $this->render('index');
    }

}
