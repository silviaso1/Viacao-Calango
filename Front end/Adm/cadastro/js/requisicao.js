document.addEventListener("DOMContentLoaded", () => {
    // Definindo os links que alteram o tipo de cadastro
    document.querySelector('#link-onibus').addEventListener('click', () => {
        localStorage.setItem('tipoCadastro', 'onibus');
        window.location.reload();  // Recarrega a página para atualizar o formulário
    });

    document.querySelector('#link-motorista').addEventListener('click', () => {
        localStorage.setItem('tipoCadastro', 'motorista');
        window.location.reload();  // Recarrega a página para atualizar o formulário
    });

    document.querySelector('#link-funcionario').addEventListener('click', () => {
        localStorage.setItem('tipoCadastro', 'funcionario');
        window.location.reload();  // Recarrega a página para atualizar o formulário
    });

    const tipoCadastro = localStorage.getItem('tipoCadastro');  // Recupera o tipo de cadastro
    const btnCadastrar = document.getElementById("btn-cadastrar");
    const listaItens = document.getElementById("lista-itens");  // Elemento para exibir a lista de itens

    // Função para enviar os dados por requisição
    const enviarDados = (dados, tipoCadastro) => {
        fetch('cadastro.php', {  // Envia os dados para o arquivo PHP que irá salvar no banco
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipoCadastro: tipoCadastro,
                dados: dados
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Sucesso:', data);
            // Exibe os itens cadastrados após a inserção
            exibirItens(data.itens);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    };

    // Função para exibir os itens cadastrados
    const exibirItens = (itens) => {
        listaItens.innerHTML = '';  // Limpa a lista antes de preencher

        if (itens.length === 0) {
            listaItens.innerHTML = '<p>Nenhum item cadastrado ainda.</p>';
            return;
        }

        itens.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.textContent = JSON.stringify(item);  // Exibe o item de forma simples
            listaItens.appendChild(itemElement);
        });
    };

    // Função que será chamada ao clicar no botão "Cadastrar"
    btnCadastrar.addEventListener("click", (e) => {
        e.preventDefault();  // Impede o comportamento padrão de envio do formulário

        let dados = {};
        if (tipoCadastro === 'onibus') {
            dados = {
                modelo: document.getElementById('modelo').value,
                placa: document.getElementById('placa').value,
                ano: document.getElementById('ano').value,
                capacidade: document.getElementById('capacidade').value,
            };
        } else if (tipoCadastro === 'motorista') {
            dados = {
                nome: document.getElementById('nome').value,
                cnh: document.getElementById('cnh').value,
                experiencia: document.getElementById('experiencia').value,
            };
        } else if (tipoCadastro === 'funcionario') {
            dados = {
                nomeFuncionario: document.getElementById('nomeFuncionario').value,
                cargo: document.getElementById('cargo').value,
                departamento: document.getElementById('departamento').value,
                salario: document.getElementById('salario').value,
            };
        }

        // Verifica se os campos estão preenchidos antes de enviar
        if (Object.values(dados).every(value => value !== '')) {
            enviarDados(dados, tipoCadastro);  // Envia os dados para o servidor
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

    // Buscar os itens já cadastrados quando a página for carregada
    const buscarItens = () => {
        fetch('cadastro.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipoBusca: tipoCadastro
            })
        })
        .then(response => response.json())
        .then(data => {
            exibirItens(data.itens);  // Exibe os itens cadastrados
        })
        .catch(error => {
            console.error('Erro ao buscar os itens:', error);
        });
    };

    // Chama a função para buscar e exibir os itens cadastrados
    buscarItens();
});
