<?php

namespace Phro\Web;

class Controller {

    public function index(): void {
        print_r(json_encode(['status' => 200, 'message' => 'Hello world!']));
    }

    public function notFound(): void {
        print_r(json_encode(['status' => 404, 'message' => 'Resource not found!']));
    }

}