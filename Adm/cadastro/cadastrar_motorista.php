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

// Função para cadastrar motorista
function cadastrarMotorista($nome, $cnh, $cpf, $id, $conn) {
    $sql = "INSERT INTO motoristas (nome, cnh, cpf, id) VALUES ('$nome', '$cnh', '$cpf', '$id')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Motorista cadastrado com sucesso!']);
    } else {
        echo json_encode(['message' => 'Erro ao cadastrar motorista: ' . $conn->error]);
    }
}

// Função para editar motorista
function editarMotorista($id, $nome, $cnh, $cpf, $conn) {
    $sql = "UPDATE motoristas SET nome='$nome', cnh='$cnh', cpf='$cpf' WHERE id='$id'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Motorista atualizado com sucesso!']);
    } else {
        echo json_encode(['message' => 'Erro ao atualizar motorista: ' . $conn->error]);
    }
}

// Função para excluir motorista
function excluirMotorista($id, $conn) {
    $sql = "DELETE FROM motoristas WHERE id='$id'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Motorista excluído com sucesso!']);
    } else {
        echo json_encode(['message' => 'Erro ao excluir motorista: ' . $conn->error]);
    }
}

// Função para listar motoristas
function listarMotoristas($conn) {
    $sql = "SELECT * FROM motoristas";
    $result = $conn->query($sql);
    $motoristas = [];
    while ($row = $result->fetch_assoc()) {
        $motoristas[] = $row;
    }
    echo json_encode($motoristas);
}

// Verifica o método de requisição e executa a ação correspondente
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    cadastrarMotorista($data['nome'], $data['cnh'], $data['cpf'], $data['id'], $conn);
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    editarMotorista($data['id'], $data['nome'], $data['cnh'], $data['cpf'], $conn);
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    excluirMotorista($data['id'], $conn);
} else {
    listarMotoristas($conn);
}

$conn->close();
?>
