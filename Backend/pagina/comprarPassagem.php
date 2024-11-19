<?php
// Recebe os dados da requisição POST
$data = json_decode(file_get_contents('php://input'), true);

$departure = $data['departure'];  // Local de partida
$destination = $data['destination']; // Local de destino
$date = $data['date'];  // Data de ida
$returnDate = $data['returnDate'];  // Data de volta (se aplicável)
$tripType = $data['tripType'];  // Tipo de viagem (ida ou ida e volta)

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

// Inserir os dados recebidos no banco de dados (exemplo)
$sql = "INSERT INTO passagens (departure, destination, date, return_date, trip_type)
        VALUES ('$departure', '$destination', '$date', '$returnDate', '$tripType')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Passagem cadastrada com sucesso!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Erro ao cadastrar passagem: " . $conn->error]);
}

$conn->close();
?>
