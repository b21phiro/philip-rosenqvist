<?php
    $title = (isset($title)) ? $title : "";
    $filename = (isset($filename)) ? __DIR__ . "/../" . $filename : false;
    $css = (isset($css)) ? $css : [];
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="/public/assets/css/base.css" type="text/css" />
        <link rel="stylesheet" href="/public/assets/css/layout.css" type="text/css" />
        <link rel="stylesheet" href="/public/assets/css/state.css" type="text/css" />
        <link rel="stylesheet" href="/public/assets/css/theme.css" type="text/css" />
        <?php
            foreach ($css as $sheet) {
                echo "<link rel=\"stylesheet\" href=\"/public/assets/css/$sheet\" type='text/css'/>";
            }
        ?>
        <title>Phillip Rosenqvist <?php if (strlen($title) > 0) echo $title; ?></title>
    </head>
    <body>
        <?php if ($filename !== false) include $filename; ?>
    </body>
</html>