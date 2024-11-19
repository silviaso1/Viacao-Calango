
function carregarFormulario() {
    // Lê o tipo de cadastro do localStorage
    const tipoCadastro = localStorage.getItem('tipoCadastro');
    const formulario = document.getElementById('formulario');
    const tituloCadastro = document.getElementById('titulo-cadastro');

    if (tipoCadastro === 'onibus') {
        tituloCadastro.textContent = 'Cadastro de Ônibus';
        formulario.innerHTML = `
            <input type="text" placeholder="Modelo do ônibus" required>
            <input type="text" placeholder="Placa do veículo" required>
            <input type="text" placeholder="Ano" required>
            <input type="text" placeholder="Capacidade de assentos" required>
            <button type="submit">Cadastrar</button>
        `;
    } else if (tipoCadastro === 'motorista') {
        tituloCadastro.textContent = 'Cadastro de Motorista';
        formulario.innerHTML = `
            <input type="text" placeholder="Nome do motorista" required>
            <input type="text" placeholder="CNH" required>
            <input type="text" placeholder="Experiência (anos)" required>
            <button type="submit">Cadastrar</button>
        `;
    } else if (tipoCadastro === 'funcionario') {
        tituloCadastro.textContent = 'Cadastro de Funcionário';
        formulario.innerHTML = `
            <input type="text" placeholder="Nome do funcionário" required>
            <input type="text" placeholder="Cargo" required>
            <input type="text" placeholder="Departamento" required>
            <input type="text" placeholder="Salário" required>
            <button type="submit">Cadastrar</button>
        `;
    }
}

// Chama a função quando a página for carregada
window.onload = carregarFormulario;

function configurarCadastro() {
    // Obtenha as referências dos elementos
    const imagem = document.querySelector('img[alt="Ônibus"]');
    const link = document.querySelector('.card a');

    // Adicione os event listeners aos botões
    document.querySelectorAll('.botoes button').forEach((botao, index) => {
        botao.addEventListener('click', () => {
            // Defina a imagem e o link com base no botão clicado
            let tipoCadastro;
            if (index === 0) {
                imagem.src = './img/onibus.png'; // Substitua pelo caminho da imagem
                tipoCadastro = 'onibus';
            } else if (index === 1) {
                imagem.src = './img/motorista.png'; // Substitua pelo caminho da imagem
                tipoCadastro = 'motorista';
            } else if (index === 2) {
                imagem.src = './img/funcionario.png'; // Substitua pelo caminho da imagem
                tipoCadastro = 'funcionario';
            }

            // Salva o identificador no localStorage
            localStorage.setItem('tipoCadastro', tipoCadastro);

            // Define o link para a página de cadastro
            link.href = 'fazerCadastro.html';
        });
    });
}

// Chame a função em seu arquivo principal ou em outro arquivo JS
configurarCadastro();
