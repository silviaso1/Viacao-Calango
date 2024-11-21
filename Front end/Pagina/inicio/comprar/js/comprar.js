function updateTripType() {
    const returnDate = document.getElementById('returnDate');
    const tripType = document.querySelector('input[name="tripType"]:checked').value;
    const roundTripCards = document.querySelectorAll('.round-trip');

    if (tripType === 'round-trip') {
        returnDate.style.display = 'block';
        roundTripCards.forEach(card => card.style.display = 'flex');
    } else {
        returnDate.style.display = 'none';
        roundTripCards.forEach(card => card.style.display = 'none');
    }
}

function filterByPrice() {
    const journeys = Array.from(document.querySelectorAll('.journey-card'));
    journeys.sort((a, b) => a.getAttribute('data-price') - b.getAttribute('data-price'));
    const container = document.getElementById('journeys');
    container.innerHTML = '';
    journeys.forEach(journey => container.appendChild(journey));
}

function filterByDuration() {
    const journeys = Array.from(document.querySelectorAll('.journey-card'));
    journeys.sort((a, b) => a.getAttribute('data-duration') - b.getAttribute('data-duration'));
    const container = document.getElementById('journeys');
    container.innerHTML = '';
    journeys.forEach(journey => container.appendChild(journey));
}

document.addEventListener('DOMContentLoaded', () => {
    const destinationField = document.getElementById('destination');
    const savedDestination = localStorage.getItem('destination');

    // Atualiza o placeholder do campo "Destino"
    if (savedDestination) {
        destinationField.placeholder = savedDestination;
        destinationField.disabled = true;
    } else {
        destinationField.placeholder = "Selecione um destino";
    }
});

function updateTripType() {
    const tripType = document.querySelector('input[name="tripType"]:checked').value;
    document.getElementById('returnDate').style.display = tripType === 'round-trip' ? 'block' : 'none';
}

// Salvar os detalhes da viagem no localStorage
function saveJourneyDetails(element) {
    const journeyCard = element.closest('.journey-card');
    const journeyDetails = {
        tipo: journeyCard.querySelector('p').textContent,
        horarioSaida: journeyCard.querySelector('.journey-info p:first-child').textContent,
        horarioChegada: journeyCard.querySelector('.journey-info p:nth-child(3)').textContent,
        origem: document.getElementById('departure').placeholder,
        destino: document.getElementById('destination').placeholder,
        tempoViagem: journeyCard.dataset.duration + " minutos",
        preco: journeyCard.dataset.price
    };

    const dates = {
        dataIda: document.querySelector('input[type="date"]').value,
        dataVolta: document.getElementById('returnDate').style.display === 'block' 
            ? document.querySelector('#returnDate input').value 
            : null
    };

    localStorage.setItem('selectedJourney', JSON.stringify({ ...journeyDetails, ...dates }));
    window.location.href = "../assento/assento.html";
}
