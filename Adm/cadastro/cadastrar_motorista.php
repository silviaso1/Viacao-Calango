<?php
header("Content-Type: application/json");

// Conexão com o banco de dados
$conn = new mysqli("localhost", "root", "", "viacao");

// Verificar conexão
if ($conn->connect_error) {
    echo json_encode(["message" => "Conexão falhou: " . $conn->connect_error]);
    exit;
}

// Verificar o método HTTP
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Receber os dados enviados em JSON
    $data = json_decode(file_get_contents("php://input"), true);

    // Validar os campos
    if (!isset($data['nome'], $data['cnh'], $data['cpf'], $data['id'])) {
        echo json_encode(["message" => "Erro: Todos os campos devem ser preenchidos."]);
        exit;
    }

    // Escapar os dados para evitar SQL Injection
    $nome = $conn->real_escape_string($data['nome']);
    $cnh = $conn->real_escape_string($data['cnh']);
    $cpf = $conn->real_escape_string($data['cpf']);
    $id = $conn->real_escape_string($data['id']);

    // Inserir no banco de dados
    $sql = "INSERT INTO motoristas (nome, cnh, cpf, id) 
            VALUES ('$nome', '$cnh', '$cpf', '$id')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Motorista cadastrado com sucesso!"]);
    } else {
        echo json_encode(["message" => "Erro ao cadastrar o motorista: " . $conn->error]);
    }
} elseif ($method === 'GET') {
    // Buscar os dados para listagem
    $sql = "SELECT nome, cnh, cpf, id FROM motoristas";
    $result = $conn->query($sql);

    $motoristas = [];
    while ($row = $result->fetch_assoc()) {
        $motoristas[] = $row;
    }

    // Retornar os dados como JSON
    echo json_encode($motoristas);
} else {
    // Responder com erro para outros métodos HTTP
    echo json_encode(["message" => "Método não suportado. Use POST ou GET."]);
}

$conn->close();
?>
