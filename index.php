<?php

use Phro\Web\App\App;

require 'vendor/autoload.php';

# Usage for .env variables.
Dotenv\Dotenv::createImmutable(__DIR__)->load();

# Init request object.
$request = \GuzzleHttp\Psr7\ServerRequest::fromGlobals();

# Init application.
$app = new App();
$app->run($request);