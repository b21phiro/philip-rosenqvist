<?php

use Phro\Web\Controller\WebsiteController;
use \Phro\Web\Http\GetRoute;

require __DIR__ . '/vendor/autoload.php';

$request = \GuzzleHttp\Psr7\ServerRequest::fromGlobals();

$app = new Phro\Web\App();
$app->addRoute(new GetRoute('/', [WebsiteController::class, 'index']));

$response = $app->handle($request);
echo $response->getBody();
http_response_code($response->getStatusCode());