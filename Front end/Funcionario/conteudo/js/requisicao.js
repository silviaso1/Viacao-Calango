// Função para enviar os dados para o backend via AJAX
function enviarDados(section) {
    let dados = {};

    // Coleta os dados com base na seção ativa
    if (section === 'reservas' || section === 'cancelamentos') {
        dados = {
            consulta: document.querySelector('input[name="consulta"]:checked') ? document.querySelector('input[name="consulta"]:checked').value : null,
            inputValue: document.getElementById('inputField') ? document.getElementById('inputField').value : null
        };
    } else if (section === 'emissao') {
        dados = {
            nomeCliente: document.getElementById('nomeCliente').value,
            cpfCliente: document.getElementById('cpfCliente').value,
            emailCliente: document.getElementById('emailCliente').value,
            destino: document.getElementById('destinoCliente') ? document.getElementById('destinoCliente').value : null,
            assento: document.getElementById('assentoCliente') ? document.getElementById('assentoCliente').value : null
        };
    }

    // Verifica se há dados para enviar
    if (Object.keys(dados).length === 0 || Object.values(dados).includes(null)) {
        console.log('Nenhum dado para enviar ou dados incompletos');
        return;
    }

    // Envia os dados para o backend via fetch (AJAX)
    fetch('seu-arquivo-php.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        // Aqui você pode tratar a resposta do servidor, por exemplo, mostrar uma confirmação
        console.log('Dados enviados com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao enviar os dados:', error);
    });
}

// Função que é chamada ao avançar entre páginas dentro da seção 'Emissão'
function coletarDadosEmitirPassagem() {
    const nome = document.getElementById('nomeCliente').value;
    const cpf = document.getElementById('cpfCliente').value;
    const email = document.getElementById('emailCliente').value;
    const destino = document.getElementById('destinoCliente').value;
    const assento = document.getElementById('assentoCliente').value;

    // Verifica se todos os campos foram preenchidos
    if (!nome || !cpf || !email || !destino || !assento) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Envia os dados para o servidor
    enviarDados('emissao'); // Envia os dados da seção de emissão

    // Avançar para a próxima "página" ou etapa (exemplo de navegação ou exibição de nova seção)
    escolherAssento();  // Esta função precisa ser definida para avançar ou exibir o próximo passo
}
