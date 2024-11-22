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
    if (!isset($data['nome'], $data['cpf'], $data['cargo'], $data['numero_cracha'])) {
        echo json_encode(["message" => "Erro: Todos os campos devem ser preenchidos."]);
        exit;
    }

    // Escapar os dados para evitar SQL Injection
    $nome = $conn->real_escape_string($data['nome']);
    $cpf = $conn->real_escape_string($data['cpf']);
    $cargo = $conn->real_escape_string($data['cargo']);
    $numero_cracha = $conn->real_escape_string($data['numero_cracha']);

    // Inserir no banco de dados
    $sql = "INSERT INTO funcionarios (nome, cpf, cargo, numero_cracha) 
            VALUES ('$nome', '$cpf', '$cargo', '$numero_cracha')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Funcionário cadastrado com sucesso!"]);
    } else {
        echo json_encode(["message" => "Erro ao cadastrar o funcionário: " . $conn->error]);
    }
} elseif ($method === 'GET') {
    // Buscar os dados para listagem
    $sql = "SELECT nome, cpf, cargo, numero_cracha FROM funcionarios";
    $result = $conn->query($sql);

    $funcionarios = [];
    while ($row = $result->fetch_assoc()) {
        $funcionarios[] = $row;
    }

    // Retornar os dados como JSON
    echo json_encode($funcionarios);
} else {
    // Responder com erro para outros métodos HTTP
    echo json_encode(["message" => "Método não suportado. Use POST ou GET."]);
}

$conn->close();
?>
