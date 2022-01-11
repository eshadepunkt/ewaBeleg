<?php
$server_name = "localhost";
$nser_name = "G08";
$password = "em56ping";
$db_name = "g08";
// Create connection
$conn = mysqli_connect($server_name, $nser_name, $password, $db_name);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

//$obj = json_decode($_POST["limit"], false);

$obj = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    try {
        $query = "INSERT INTO buecher1 (" .
            "isbn13, title, authors, publisher, price, stock, `desc`, pages, image" .
            ") VALUES (" .
            "\"" . $obj["isbn13"] . "\"," .
            "\"" . $obj["title"] . "\"," .
            "\"" . $obj["authors"] . "\"," .
            "\"" . $obj["publisher"] . "\"," .
            substr($obj["price"], 1) . "," .
            $obj["stock"] . "," .
            "\"" . $obj["desc"] . "\"," .
            $obj["pages"] . "," .
            "\"" . $obj["image"] . "\")";

        $stmt = $conn->prepare($query);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode($query);
        } else {
            $stmt->execute();
        }
    } catch (\Throwable $th) {
        echo $th;
    }
} else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $query = "SELECT * FROM buecher1";
    $stmt = $conn->prepare($query);
    //$stmt->bind_param("s", $obj->limit);
    $stmt->execute();
    $result = $stmt->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);

    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode($outp);
} else if ($_SERVER['REQUEST_METHOD'] == 'PUT') {

    $query = "UPDATE buecher1 SET stock = " . $obj["stock"] . " WHERE isbn13 = " . $obj["isbn13"];
    $stmt = $conn->prepare($query);
    if (!$stmt) {
        http_response_code(500);
        echo json_encode($query);
    } else {
        $stmt->execute();
        echo json_encode($query);
    }
}




$conn->close();
