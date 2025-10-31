<?php namespace Phro\Web\Core\Controller;

use GuzzleHttp\Psr7\Response;

abstract class Controller {
    public abstract function index(mixed ...$params): Response;
}