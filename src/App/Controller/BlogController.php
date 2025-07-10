<?php

namespace Phro\Web\App\Controller;

use GuzzleHttp\Psr7\Response;

class BlogController extends Controller {

    public function post(int $id): Response {
        return new Response(200, [], 'Blog post '.$id);
    }

}