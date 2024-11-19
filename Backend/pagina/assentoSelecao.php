<?php
// Recebe os dados da requisição POST
$data = json_decode(file_get_contents('php://input'), true);
$seats = $data['seats']; // Assentos selecionados

// Exemplo de conexão com o banco de dados (substitua com suas credenciais)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "viajaca";

// Criando conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificando se a conexão foi bem-sucedida
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Processando os assentos selecionados (exemplo de inserção no banco)
foreach ($seats as $seat) {
    if ($seat !== null) {
        $sql = "INSERT INTO assentos (assento) VALUES ('$seat')";
        
        if ($conn->query($sql) !== TRUE) {
            echo json_encode(["status" => "error", "message" => "Erro ao registrar o assento: " . $conn->error]);
            $conn->close();
            exit;
        }
    }
}

echo json_encode(["status" => "success", "message" => "Assentos reservados com sucesso!"]);
$conn->close();
?>
