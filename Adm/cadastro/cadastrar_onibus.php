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
    if (!isset($data['modelo'], $data['placa'], $data['ano'], $data['capacidade'])) {
        echo json_encode(["message" => "Erro: Todos os campos devem ser preenchidos."]);
        exit;
    }

    // Escapar os dados para evitar SQL Injection
    $modelo = $conn->real_escape_string($data['modelo']);
    $placa = $conn->real_escape_string($data['placa']);
    $ano = $conn->real_escape_string($data['ano']);
    $capacidade = $conn->real_escape_string($data['capacidade']);

    // Inserir no banco de dados
    $sql = "INSERT INTO onibus (modelo, placa, ano, capacidade) VALUES ('$modelo', '$placa', '$ano', '$capacidade')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Ônibus cadastrado com sucesso!"]);
    } else {
        echo json_encode(["message" => "Erro ao cadastrar o ônibus: " . $conn->error]);
    }
} elseif ($method === 'GET') {
    // Buscar os dados para listagem
    $sql = "SELECT id, modelo, placa FROM onibus";
    $result = $conn->query($sql);

    $onibus = [];
    while ($row = $result->fetch_assoc()) {
        $onibus[] = $row;
    }

    echo json_encode($onibus);
} elseif ($method === 'DELETE') {
    // Deletar um ônibus
    $data = json_decode(file_get_contents("php://input"), true);
    $id = (int)$data['id'];

    if ($id > 0) {
        $sql = "DELETE FROM onibus WHERE id = $id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Ônibus deletado com sucesso!"]);
        } else {
            echo json_encode(["message" => "Erro ao deletar o ônibus: " . $conn->error]);
        }
    } else {
        echo json_encode(["message" => "ID inválido."]);
    }
} elseif ($method === 'PUT') {
    // Editar um ônibus
    $data = json_decode(file_get_contents("php://input"), true);
    $id = (int)$data['id'];
    $modelo = $conn->real_escape_string($data['modelo']);
    $placa = $conn->real_escape_string($data['placa']);
    $ano = $conn->real_escape_string($data['ano']);
    $capacidade = $conn->real_escape_string($data['capacidade']);

    if ($id > 0 && $modelo && $placa && $ano && $capacidade) {
        $sql = "UPDATE onibus SET modelo = '$modelo', placa = '$placa', ano = '$ano', capacidade = '$capacidade' WHERE id = $id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Ônibus atualizado com sucesso!"]);
        } else {
            echo json_encode(["message" => "Erro ao atualizar o ônibus: " . $conn->error]);
        }
    } else {
        echo json_encode(["message" => "Erro: Dados inválidos."]);
    }
} else {
    // Responder com erro para outros métodos HTTP
    echo json_encode(["message" => "Método não suportado. Use POST, GET, PUT ou DELETE."]);
}

$conn->close();
?>
