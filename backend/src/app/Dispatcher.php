<?php

namespace Phro\Web\App;

class Dispatcher {

    public function routeHandler(array $request, Route | null $route): void {
        if ($route === null) {
            $controller = new Controller();
            $controller->notFound();
        } else {
            $action = $route->getAction();
            $controller = new $action[0]();
            $method = $action[1];
            try {
                call_user_func_array([$controller, $method], []);
            } catch (\Exception $exception) {
                echo $exception->getMessage();
            }
        }
    }

}