<?php

namespace Phro\Web;

class App {

    function __construct() {}

    function run(): void {
        ob_start();
        require_once __DIR__ . '/../public/index.html';
        $html = ob_get_clean();
        echo $html;
    }

}