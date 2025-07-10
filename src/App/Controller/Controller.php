<?php

namespace Phro\Web\App\Controller;

use GuzzleHttp\Psr7\Request;

abstract class Controller {

    protected Request $request;

    public function setRequest(Request $request): void {
        $this->request = $request;
    }

}