<?php

namespace Phro\Web\App\Controller;

use GuzzleHttp\Psr7\Response;

class LoginController extends Controller {

    public function index(): Response {
        return $this->view->render(200, 'login/index.php', [
            'title' => ' | Log in',
            'css' => [
                'modules/login/form.css'
            ]
        ]);
    }

}