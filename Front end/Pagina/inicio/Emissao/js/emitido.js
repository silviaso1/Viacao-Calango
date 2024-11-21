document.addEventListener('DOMContentLoaded', () => {
    carregarPassagens();

    // Formulário de adição
    const form = document.getElementById('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const tipo = document.querySelector('input[name="tipo"]').value;
        const origem = document.querySelector('input[name="origem"]').value;
        const destino = document.querySelector('input[name="destino"]').value;
        const horarioSaida = document.querySelector('input[name="horarioSaida"]').value;
        const horarioChegada = document.querySelector('input[name="horarioChegada"]').value;
        const preco = document.querySelector('input[name="preco"]').value;

        adicionarPassagem({ tipo, origem, destino, horarioSaida, horarioChegada, preco });

        form.reset();
        form.style.display = 'none'; // Esconde o formulário após salvar
    });
});

function mostrarFormulario() {
    const formPassagem = document.getElementById('form-passagem');
    formPassagem.style.display = formPassagem.style.display === 'none' ? 'block' : 'none';
}
function carregarPassagens() {
    const passagens = JSON.parse(localStorage.getItem('passagensEmitidas')) || [];
    const listaPassagens = document.getElementById('lista-passagens');
    listaPassagens.innerHTML = '';

    if (passagens.length === 0) {
        listaPassagens.innerHTML = '<p>Não há passagens emitidas.</p>';
    } else {
        passagens.forEach((passagem, index) => {
            const itemPassagem = document.createElement('div');
            itemPassagem.classList.add('passagem');
            itemPassagem.innerHTML = `
                <p><strong>Tipo:</strong> ${passagem.tipo}</p>
                <p><strong>Origem:</strong> ${passagem.origem}</p>
                <p><strong>Destino:</strong> ${passagem.destino}</p>
                <p><strong>Horário de Saída:</strong> ${passagem.horarioSaida}</p>
                <p><strong>Horário de Chegada:</strong> ${passagem.horarioChegada}</p>
                <p><strong>Data de Ida:</strong> ${passagem.dataIda}</p>
                ${passagem.dataVolta ? `<p><strong>Data de Volta:</strong> ${passagem.dataVolta}</p>` : ''}
                <p><strong>Assentos:</strong> ${passagem.assentos}</p>
                <p><strong>Passageiro:</strong> ${passagem.nome} (${passagem.documento})</p>
                <p><strong>Preço:</strong> R$ ${passagem.preco}</p>
                <button onclick="deletarPassagem(${index})">Deletar</button>
            `;
            listaPassagens.appendChild(itemPassagem);
        });
    }
}

function deletarPassagem(index) {
    const passagens = JSON.parse(localStorage.getItem('passagensEmitidas')) || [];

    passagens.splice(index, 1);

    localStorage.setItem('passagensEmitidas', JSON.stringify(passagens));

    carregarPassagens();
}

