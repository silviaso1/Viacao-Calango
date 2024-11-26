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

// Verifica se uma passagem foi solicitada para exclusão
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
    $id = $_POST['id'];
    $sqlExcluir = "DELETE FROM passagens WHERE id = $id";

    if (mysqli_query($conexao, $sqlExcluir)) {
        echo "<script>alert('Passagem excluída com sucesso!');</script>";
    } else {
        echo "<script>alert('Erro ao excluir passagem: " . mysqli_error($conexao) . "');</script>";
    }
}

// Busca todas as passagens
$sql = "SELECT * FROM passagens";
$resultado = mysqli_query($conexao, $sql);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Passagens Registradas</title>
    <link rel="stylesheet" href="./css/listar.css">
      
</head>
<body>
    <header>
       <a href="../portal/portal.html">
           <img src="../exports/logo.png" alt="Logo Viação Galango">
        </a>

     </header>

    <div class="container">
        <?php while ($linha = mysqli_fetch_assoc($resultado)): ?>
        <div class="passagem-card">
            <div class="passagem-header">
                <?= $linha['nome'] ?>
            </div>
            <div class="passagem-details">
                <p><strong>Documento:</strong> <?= $linha['documento'] ?></p>
                <p><strong>Tipo:</strong> <?= $linha['tipo'] ?></p>
                <p><strong>Origem:</strong> <?= $linha['origem'] ?></p>
                <p><strong>Destino:</strong> <?= $linha['destino'] ?></p>
                <p><strong>Data Ida:</strong> <?= $linha['data_ida'] ?></p>
                <p><strong>Data Volta:</strong> <?= $linha['data_volta'] ?></p>
                <p><strong>Horário Saída:</strong> <?= $linha['horario_saida'] ?></p>
                <p><strong>Horário Chegada:</strong> <?= $linha['horario_chegada'] ?></p>
                <p><strong>Tempo Viagem:</strong> <?= $linha['tempo_viagem'] ?></p>
                <p><strong>Assentos:</strong> <?= $linha['assentos'] ?></p>
                <p class="passagem-price">R$ <?= $linha['preco'] ?></p>
            </div>
            <div class="actions">
                <form method="POST" onsubmit="return confirm('Tem certeza que deseja excluir esta passagem?');">
                    <input type="hidden" name="id" value="<?= $linha['id'] ?>">
                    <button type="submit">Excluir</button>
                </form>
            </div>
        </div>
        <?php endwhile; ?>
    </div>

    <footer class="footer">
                <div class="footer-sections">
                    <div class="footer-column">
                        <h3>Viação Calango</h3>
                        <ul>
                            <li><a href="#">Sobre a Viação Calango</a></li>
                            <li><a href="#">Imprensa</a></li>
                            <li><a href="#">Baixe o app</a></li>
                            <li><a href="#">Trabalhe na Viação Calango</a></li>
                            <li><a href="#">Seja um parceiro</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h3>Links úteis</h3>
                        <ul>
                            <li><a href="#">Destinos</a></li>
                            <li><a href="#">Rodoviárias</a></li>
                            <li><a href="#">Viagens</a></li>
                            <li><a href="#">Passagens promocionais</a></li>
                            <li><a href="#">Destinos interconectados</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h3>Guias de viagem</h3>
                        <ul>
                            <li><a href="#">Guia de destino Rio de Janeiro</a></li>
                            <li><a href="#">Guia de destino Maranhão</a></li>
                            <li><a href="#">Guia de destino Paraíba</a></li>
                            <li><a href="#">Guia de destino Pernambuco</a></li>
                            <li><a href="#">Guia de destino Paraná</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h3>Informações</h3>
                        <ul>
                            <li><a href="#">Dúvidas frequentes</a></li>
                            <li><a href="#">Políticas de privacidade</a></li>
                            <li><a href="#">Canal de transparência</a></li>
                            <li><a href="#">Termos de uso</a></li>
                        </ul>
                    </div>
                </div>
               

                   
            </footer>
</body>
</html>
