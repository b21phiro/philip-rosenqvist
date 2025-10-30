<?php namespace Phro\Web\Controller;

use GuzzleHttp\Psr7\Response;

class WebsiteController extends Controller {

    public function index(): Response {
        return new Response(200, [], 'Hello world!');
    }

}
