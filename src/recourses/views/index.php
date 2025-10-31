<?php ob_start(); ?>

<h1>Hello world!</h1>

<?php
    $content = ob_get_clean();
    include __DIR__ . "/../includes/templates/default.php";
?>
