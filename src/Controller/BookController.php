<?php namespace Phro\Web\Controller;

use GuzzleHttp\Psr7\Response;

class BookController extends Controller {
    public function book(int $id): Response {
        return new Response(200, [], "Boodddk $id");
    }
}

