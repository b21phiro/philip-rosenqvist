<?php

require __DIR__ . '/vendor/autoload.php';

$request = \GuzzleHttp\Psr7\ServerRequest::fromGlobals();

$app = new Phro\Web\App();
$app->html($request);