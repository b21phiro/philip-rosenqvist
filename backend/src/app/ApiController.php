<?php

namespace Phro\Web\App;

class ApiController {

    public function index(): void {
        print_r(json_encode(['status' => 200, 'message' => 'Hello world!']));
    }

    public function notFound(): void {
        print_r(json_encode(['status' => 404, 'message' => 'Resource not found!']));
    }

}