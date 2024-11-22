
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
                link.href = 'fazerCadastro.html';
            } else if (index === 1) {
                imagem.src = './img/motorista.png'; // Substitua pelo caminho da imagem
                link.href = 'cadastrarMotorista.html';
            } else if (index === 2) {
                imagem.src = './img/funcionario.png'; // Substitua pelo caminho da imagem
                tipoCadastro = 'funcionario';
                link.href = 'funcionarioCadastro.html';
            }
            
        });
    });
}
// Chame a função em seu arquivo principal ou em outro arquivo JS
configurarCadastro();