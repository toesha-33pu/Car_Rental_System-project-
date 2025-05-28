<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "car_rent";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$sql = "SELECT * FROM vehicles";
$result = $conn->query($sql);

$vehicles = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $vehicles[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($vehicles);
?>