<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "viacao";  // Altere para o nome do seu banco de dados

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Recebe os dados JSON do frontend
$data = json_decode(file_get_contents('php://input'), true);

// Função para cadastrar ônibus
function cadastrarOnibus($placa, $modelo, $capacidade, $id, $conn) {
    $sql = "INSERT INTO onibus (placa, modelo, capacidade, id) VALUES ('$placa', '$modelo', '$capacidade', '$id')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Ônibus cadastrado com sucesso!']);
    } else {
        echo json_encode(['message' => 'Erro ao cadastrar ônibus: ' . $conn->error]);
    }
}

// Função para editar ônibus
function editarOnibus($id, $placa, $modelo, $capacidade, $conn) {
    $sql = "UPDATE onibus SET placa='$placa', modelo='$modelo', capacidade='$capacidade' WHERE id='$id'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Ônibus atualizado com sucesso!']);
    } else {
        echo json_encode(['message' => 'Erro ao atualizar ônibus: ' . $conn->error]);
    }
}

// Função para excluir ônibus
function excluirOnibus($id, $conn) {
    $sql = "DELETE FROM onibus WHERE id='$id'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Ônibus excluído com sucesso!']);
    } else {
        echo json_encode(['message' => 'Erro ao excluir ônibus: ' . $conn->error]);
    }
}

// Função para listar ônibus
function listarOnibus($conn) {
    $sql = "SELECT * FROM onibus";
    $result = $conn->query($sql);
    $onibus = [];
    while ($row = $result->fetch_assoc()) {
        $onibus[] = $row;
    }
    echo json_encode($onibus);
}

// Verifica o método HTTP
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    cadastrarOnibus($data['placa'], $data['modelo'], $data['capacidade'], $data['id'], $conn);
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    editarOnibus($data['id'], $data['placa'], $data['modelo'], $data['capacidade'], $conn);
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    excluirOnibus($data['id'], $conn);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    listarOnibus($conn);
}

// Fechar conexão
$conn->close();
?>
