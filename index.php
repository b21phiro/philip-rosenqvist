<?php

// ini_set('display_startup_errors', 1);

use Phro\Web\Core\Controller\WebsiteController;
use Phro\Web\Core\Http\GetRoute;

require __DIR__ . '/vendor/autoload.php';

$request = \GuzzleHttp\Psr7\ServerRequest::fromGlobals();

$app = new \Phro\Web\Core\App();
$app->addRoute(new GetRoute('/', [WebsiteController::class, 'index']));

$response = $app->handle($request);
echo $response->getBody();
http_response_code($response->getStatusCode());