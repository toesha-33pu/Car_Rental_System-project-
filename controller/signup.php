<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

include_once '../model/db.php';

if (isset($_POST['submit'])) {
    $username = trim($_POST['fullName']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $confirm_password = trim($_POST['confirmPassword']);

    if (empty($username) || empty($email) || empty($password) || empty($confirm_password)) {
        echo "All fields are required.";
        exit;
    } elseif (!preg_match("/^[a-zA-Z ]+$/", $username)) {
        echo "Name should contain letters and spaces only.";
        exit;
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit;
    } elseif (strlen($password) < 8) {
        echo "Password should be at least 8 characters.";
        exit;
    } elseif (!preg_match("#[0-9]+#", $password)) {
        echo "Password must contain at least one digit.";
        exit;
    } elseif (!preg_match("#[a-z]+#", $password)) {
        echo "Password must contain at least one lowercase letter.";
        exit;
    } elseif (!preg_match("#[A-Z]+#", $password)) {
        echo "Password must contain at least one uppercase letter.";
        exit;
    } elseif ($password !== $confirm_password) {
        echo "Passwords do not match.";
        exit;
    } else {
        $status = addUser($username, $password, $email);

        if ($status) {
            echo "Registration successful!";
             header('Location: ../html/login.html');
        } else {

            echo "Registration failed.";
            header('Location: ../html/signup.html');
        }
    }
} else {
    echo "Invalid access.";
}

function addUser($full_name, $password, $email) {
    $conn = getConnection();

    // Check if email already exists
    $checkSql = "SELECT * FROM signup WHERE email = '$email'";
    $checkResult = mysqli_query($conn, $checkSql);

    if (mysqli_num_rows($checkResult) > 0) {
        echo "Email already exists.";
        return false;
    }

    // Insert new user
    $insertSql = "INSERT INTO signup (full_name, email, password) VALUES ('$full_name', '$email', '$password')";
    $result = mysqli_query($conn, $insertSql);

    if ($result) {
        return true;
    } else {
        echo "DB Error: " . mysqli_error($conn);
        return false;
    }
}
?>
