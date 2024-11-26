<?php

ini_set('display_errors', 0);
header('Content-Type: application/json');

$host = "localhost";
$user = "root";
$password = ""; 
$dbname = "viacao";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Erro ao conectar ao banco de dados: " . $conn->connect_error]);
    exit;
}

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Email ou senha não fornecidos."]);
    exit;
}


$email = $conn->real_escape_string($email);
$password = $conn->real_escape_string($password);


$sql = "SELECT * FROM loguinfuncionario WHERE email = '$email' AND senha = '$password'";
$result = $conn->query($sql);

if ($result === false) {
    echo json_encode(["success" => false, "message" => "Erro na consulta ao banco de dados: " . $conn->error]);
    exit;
}

if ($result->num_rows > 0) {
   
    echo json_encode(["success" => true, "redirectUrl" => "../cadastro/cadastro.html"]);
} else {

    echo json_encode(["success" => false, "message" => "Usuário ou senha inválidos."]);
}

$conn->close();
?>
