<?php

use Phro\Web\App;
use Phro\Web\Router;

require __DIR__ . '/vendor/autoload.php';

$request = \GuzzleHttp\Psr7\ServerRequest::fromGlobals();

$router = new Router();
$router->addRoute(["path" => "/", "method" => "GET", "handler" => fn() => __DIR__ . '/src/View/Web/index.php']);

$app = new App($router);
$app->html($request);