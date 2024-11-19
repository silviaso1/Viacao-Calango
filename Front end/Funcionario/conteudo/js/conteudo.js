function changeContent(section) {
    const container = document.getElementById('content-container');
    let contentHTML = '';

    if (section === 'reservas') {
        contentHTML = `
            <div class="form">
                <div class="radio-buttons">
                    <label><input type="radio" name="consulta" value="email" checked onclick="updatePlaceholder()"> E-mail</label>
                    <label><input type="radio" name="consulta" value="documento" onclick="updatePlaceholder()"> Documento</label>
                    <label><input type="radio" name="consulta" value="reserva" onclick="updatePlaceholder()"> Nº Reserva</label>
                </div>
                <input type="text" id="inputField" placeholder="Email">
                <button onclick="consultar()">Consultar</button>
            </div>`;
    } else if (section === 'emissao') {
        contentHTML = `
            <div class="form">
                <h2>Dados do Cliente</h2>
                <input type="text" id="nomeCliente" placeholder="Nome Completo">
                <input type="text" id="cpfCliente" placeholder="CPF">
                <input type="email" id="emailCliente" placeholder="E-mail">
                <button onclick="coletarDadosCliente()">Próximo</button>
            </div>`;
    } else if (section === 'cancelamentos') {
        contentHTML = `
            <div class="form">
                <div class="radio-buttons">
                    <label><input type="radio" name="consulta" value="email" checked onclick="updatePlaceholder()"> E-mail</label>
                    <label><input type="radio" name="consulta" value="documento" onclick="updatePlaceholder()"> Documento</label>
                    <label><input type="radio" name="consulta" value="reserva" onclick="updatePlaceholder()"> Nº Reserva</label>
                </div>
                <input type="text" id="inputField" placeholder="Email">
                <button onclick="consultarCancelamento()">Consultar</button>
            </div>`;
    }

    container.innerHTML = contentHTML;
}

function updatePlaceholder() {
    const inputField = document.getElementById('inputField');
    const selectedOption = document.querySelector('input[name="consulta"]:checked').value;

    if (selectedOption === 'email') {
        inputField.placeholder = 'Email';
    } else if (selectedOption === 'documento') {
        inputField.placeholder = 'Documento';
    } else if (selectedOption === 'reserva') {
        inputField.placeholder = 'Nº Reserva';
    }
}

function consultar() {
    const container = document.getElementById('content-container');
    container.innerHTML = '<p>Informações da reserva: Nome do Passageiro, Data da Viagem, Assento, etc.</p>';
}

function consultarCancelamento() {
    const container = document.getElementById('content-container');
    container.innerHTML = '<p>Passagens compradas por E-mail/Documento/Nº Reserva: Detalhes sobre a passagem para cancelamento.</p>';
}

function coletarDadosCliente() {
    const nome = document.getElementById('nomeCliente').value;
    const cpf = document.getElementById('cpfCliente').value;
    const email = document.getElementById('emailCliente').value;

    if (!nome || !cpf || !email) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const container = document.getElementById('content-container');
    container.innerHTML = `
        <div class="form">
            <h2>Escolha o Destino</h2>
            <select id="destinoCliente">
                <option value="rio">Rio de Janeiro</option>
                <option value="sp">São Paulo</option>
                <option value="bh">Belo Horizonte</option>
            </select>
            <button onclick="escolherAssento()">Próximo</button>
        </div>`;
}

function escolherAssento() {
    const destino = document.getElementById('destinoCliente').value;

    if (!destino) {
        alert("Por favor, escolha um destino.");
        return;
    }

    const container = document.getElementById('content-container');
    container.innerHTML = `
        <div class="form">
            <h2>Escolha o Assento</h2>
            <select id="assentoCliente">
                <option value="1A">1A</option>
                <option value="1B">1B</option>
                <option value="2A">2A</option>
                <option value="2B">2B</option>
            </select>
            <button onclick="emitirPassagem()">Emitir Passagem</button>
        </div>`;
}

function emitirPassagem() {
    const assento = document.getElementById('assentoCliente').value;
    const nome = document.getElementById('nomeCliente').value;
    const cpf = document.getElementById('cpfCliente').value;
    const email = document.getElementById('emailCliente').value;
    const destino = document.getElementById('destinoCliente').value;

    if (!assento) {
        alert("Por favor, escolha um assento.");
        return;
    }

    const container = document.getElementById('content-container');
    container.innerHTML = `
        <div class="form emitida">
            <h2>Passagem Emitida!</h2>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>CPF:</strong> ${cpf}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Destino:</strong> ${destino}</p>
            <p><strong>Assento:</strong> ${assento}</p>
        </div>`;
}
