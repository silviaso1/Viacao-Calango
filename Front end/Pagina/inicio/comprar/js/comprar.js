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