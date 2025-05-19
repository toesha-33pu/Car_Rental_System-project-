<?php
class AuthView {
    public static function showMessage($message, $type = 'error') {
        echo "<div class='message $type'>$message</div>";
    }

    public static function redirect($location) {
        header("Location: $location");
        exit();
    }
}
?>