<?php

namespace Phro\Web\App\Controller;

use GuzzleHttp\Psr7\Request;
use Phro\Web\App\View\View;

abstract class Controller {

    protected Request $request;
    protected View $view;

    public function __construct(Request $request, View $view) {
        $this->request = $request;
        $this->view = $view;
    }

}