<?php

namespace Phro\Web\App\Controller;

class BlogController extends Controller {

    public function post(int $id): void {
        echo "Blog post $id";
    }

}