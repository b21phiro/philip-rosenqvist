<?php

namespace Phro\Web\App\Controller;

class ExceptionController extends Controller {

    public function notFound(): void {
        http_response_code(404);
    }

}