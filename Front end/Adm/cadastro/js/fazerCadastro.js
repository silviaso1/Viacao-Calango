document.addEventListener("DOMContentLoaded", () => {
    const tipoCadastro = localStorage.getItem('tipoCadastro');  // Recupera o tipo de cadastro do localStorage
    const formulario = document.getElementById('formulario');
    const tituloCadastro = document.getElementById('titulo-cadastro');
    const listaUsuarios = document.getElementById("lista-usuarios");
    const btnCadastrar = document.getElementById("btn-cadastrar");

    // Função para gerar o formulário com base no tipo de cadastro
    const gerarFormulario = () => {
        if (tipoCadastro === 'onibus') {
            tituloCadastro.textContent = 'Cadastro de Ônibus';
            formulario.innerHTML = `
                <input type="text" id="modelo" placeholder="Modelo do ônibus" required>
                <input type="text" id="placa" placeholder="Placa do veículo" required>
                <input type="text" id="ano" placeholder="Ano" required>
                <input type="number" id="capacidade" placeholder="Capacidade de assentos" required>
            `;
        } else if (tipoCadastro === 'motorista') {
            tituloCadastro.textContent = 'Cadastro de Motorista';
            formulario.innerHTML = `
                <input type="text" id="nome" placeholder="Nome do motorista" required>
                <input type="text" id="cnh" placeholder="CNH" required>
                <input type="number" id="experiencia" placeholder="Experiência (anos)" required>
            `;
        } else if (tipoCadastro === 'funcionario') {
            tituloCadastro.textContent = 'Cadastro de Funcionário';
            formulario.innerHTML = `
                <input type="text" id="nomeFuncionario" placeholder="Nome do funcionário" required>
                <input type="text" id="cargo" placeholder="Cargo" required>
                <input type="text" id="departamento" placeholder="Departamento" required>
                <input type="number" id="salario" placeholder="Salário" required>
            `;
        }
    };

    // Função para adicionar um item à lista de cadastrados
    const adicionarCadastro = (dados) => {
        const li = document.createElement("li");
        li.textContent = dados;
        listaUsuarios.appendChild(li);
    };

    // Função que será chamada ao clicar no botão "Cadastrar"
    btnCadastrar.addEventListener("click", (e) => {
        e.preventDefault();  // Evita o comportamento padrão de submit do formulário
        
        let dados = '';
        if (tipoCadastro === 'onibus') {
            const modelo = document.getElementById('modelo').value;
            const placa = document.getElementById('placa').value;
            const ano = document.getElementById('ano').value;
            const capacidade = document.getElementById('capacidade').value;

            dados = `Modelo: ${modelo} | Placa: ${placa} | Ano: ${ano} | Capacidade: ${capacidade}`;
        } else if (tipoCadastro === 'motorista') {
            const nome = document.getElementById('nome').value;
            const cnh = document.getElementById('cnh').value;
            const experiencia = document.getElementById('experiencia').value;

            dados = `Nome: ${nome} | CNH: ${cnh} | Experiência: ${experiencia} anos`;
        } else if (tipoCadastro === 'funcionario') {
            const nomeFuncionario = document.getElementById('nomeFuncionario').value;
            const cargo = document.getElementById('cargo').value;
            const departamento = document.getElementById('departamento').value;
            const salario = document.getElementById('salario').value;

            dados = `Nome: ${nomeFuncionario} | Cargo: ${cargo} | Departamento: ${departamento} | Salário: ${salario}`;
        }

        // Se todos os campos forem preenchidos, adiciona o cadastro à lista
        if (dados) {
            adicionarCadastro(dados);
            formulario.reset();  // Limpa os campos do formulário
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

    // Chama a função para gerar o formulário dinamicamente
    gerarFormulario();
});
