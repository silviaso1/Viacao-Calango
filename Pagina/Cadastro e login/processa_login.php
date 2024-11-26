<?php
try {
    ini_set('display_errors', 0); 
    ini_set('log_errors', 1); 
    ini_set('error_log', '/caminho/para/php-error.log'); 

    header('Content-Type: application/json; charset=utf-8');


    $host = "localhost";
    $user = "root";
    $password = ""; 
    $dbname = "viacao";

    $conn = new mysqli($host, $user, $password, $dbname);

    if ($conn->connect_error) {
        throw new Exception("Erro ao conectar ao banco de dados.");
    }

    if (empty($_POST['email']) || empty($_POST['password'])) {
        throw new Exception("Email e senha são obrigatórios.");
    }

    $email = $_POST['email'];
    $password = $_POST['password'];

   
    $stmt = $conn->prepare("SELECT * FROM loguinusuario WHERE email = ? AND senha = ?");
    $stmt->bind_param("ss", $email, $password); 
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["success" => true, "redirectUrl" => "../inicio/portal/portal.html"]);
    } else {
        echo json_encode(["success" => false, "message" => "Usuário ou senha inválidos."]);
    }

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
    exit;
}
?>
