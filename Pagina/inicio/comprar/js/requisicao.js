function selectJourney(button) {
    const journeyCard = button.closest('.journey-card');

    const type = journeyCard.querySelector('p').innerText;
    const departureTime = journeyCard.querySelectorAll('p')[1].innerText;
    const arrivalTime = journeyCard.querySelectorAll('p')[3].innerText;
    const price = journeyCard.querySelector('.price').innerText;

    const departure = document.getElementById('departure').placeholder;
    const destination = document.getElementById('destination').placeholder;

    const journeyData = {
        tipo: type,
        partida: departure,
        destino: destination,
        horarioPartida: departureTime,
        horarioChegada: arrivalTime,
        preco: price,
    };

    console.log(journeyData);
}
