<?php
session_start();
include_once '../model/db.php';

header('Content-Type: application/json');

if (isset($_POST['submit'])) {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    if (empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'error' => 'Please enter both email and password']);
        exit;
    }

    $conn = getConnection();
    $sql = "SELECT * FROM signup WHERE email = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($result)) {
        if ($password === $row['password']) { // Use password_verify() if hashed passwords
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['user_name'] = $row['full_name'];
            $_SESSION['user_email'] = $row['email'];

            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Incorrect password']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'No account found with this email']);
    }

    mysqli_close($conn);
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request']);
}
