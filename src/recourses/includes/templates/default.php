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
    </head>
    <body>
        <?= $content; ?>
    </body>
</html>