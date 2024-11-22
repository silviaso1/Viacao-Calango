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
function cadastrarOnibus($modelo, $placa, $ano, $capacidade, $conn) {
    $sql = "INSERT INTO onibus (modelo, placa, ano, capacidade) VALUES ('$modelo', '$placa', '$ano', '$capacidade')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Ônibus cadastrado com sucesso!']);
    } else {
        echo json_encode(['message' => 'Erro ao cadastrar ônibus: ' . $conn->error]);
    }
}

// Função para editar ônibus
function editarOnibus($id, $modelo, $placa, $ano, $capacidade, $conn) {
    $sql = "UPDATE onibus SET modelo='$modelo', placa='$placa', ano='$ano', capacidade='$capacidade' WHERE id='$id'";
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
    cadastrarOnibus($data['modelo'], $data['placa'], $data['ano'], $data['capacidade'], $conn);
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    editarOnibus($data['id'], $data['modelo'], $data['placa'], $data['ano'], $data['capacidade'], $conn);
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    excluirOnibus($data['id'], $conn);
} else {
    listarOnibus($conn);
}

$conn->close();
?>
