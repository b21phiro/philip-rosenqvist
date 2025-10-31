<?php

    if (!isset($content)) {
        $content = "";
    }

    if (!isset($title)) {
        $title = "Default Template";
    }

    if (!isset($lang)) {
        $lang = "en";
    }

?>
<!DOCTYPE html>
<html lang="<?= $lang ?>">
    <head>
        <title><?= $title; ?></title>
        <link rel="icon" type="image/png" href="/public/favicon.ico"/>
    </head>
    <body>
        <?= $content; ?>
    </body>
</html>