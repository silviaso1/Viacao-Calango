function mostrarCampos(tipoPagamento) {
    // Esconde todos os formulários
    document.getElementById("form-cartao").style.display = "none";
    document.getElementById("form-pix").style.display = "none";
    document.getElementById("form-boleto").style.display = "none";

    // Exibe o formulário correspondente ao tipo de pagamento selecionado
    if (tipoPagamento === "cartao") {
        document.getElementById("form-cartao").style.display = "block";
    } else if (tipoPagamento === "pix") {
        document.getElementById("form-pix").style.display = "block";
    } else if (tipoPagamento === "boleto") {
        document.getElementById("form-boleto").style.display = "block";
    }
}