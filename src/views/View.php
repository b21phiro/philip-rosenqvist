<?php

namespace Philip\Web;

class View {

    public function __construct() {}

    public function getBody(string $page, array $bag = []): string {
        extract($bag);
        ob_start();
        require __DIR__ . "/views/templates/default.php";
        return ob_get_clean();
    }

}