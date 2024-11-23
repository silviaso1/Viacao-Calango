<?php
// Conexão com o banco de dados
$host = "localhost";
$usuario = "root";
$senha = "";
$banco = "viacao";

$conexao = mysqli_connect($host, $usuario, $senha, $banco);

if (!$conexao) {
    die("Falha na conexão com o banco de dados: " . mysqli_connect_error());
}

// Verifica se os dados foram enviados
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    $documento = $_POST['documento'];
    $tipo = $_POST['tipo'];
    $origem = $_POST['origem'];
    $destino = $_POST['destino'];
    $data_ida = $_POST['data_ida'];
    $data_volta = $_POST['data_volta'];
    $horario_saida = $_POST['horario_saida'];
    $horario_chegada = $_POST['horario_chegada'];
    $tempo_viagem = $_POST['tempo_viagem'];
    $preco = $_POST['preco'];
    $assentos = $_POST['assentos'];

    $sql = "INSERT INTO passagens (nome, documento, tipo, origem, destino, data_ida, data_volta, horario_saida, horario_chegada, tempo_viagem, preco, assentos) 
            VALUES ('$nome', '$documento', '$tipo', '$origem', '$destino', '$data_ida', '$data_volta', '$horario_saida', '$horario_chegada', '$tempo_viagem', '$preco', '$assentos')";

    if (mysqli_query($conexao, $sql)) {
        echo "Passagem salva com sucesso!";
    } else {
        echo "Erro ao salvar passagem: " . mysqli_error($conexao);
    }

    mysqli_close($conexao);
}
?>
