const container = document.querySelector('div.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const counter = document.querySelector('span.counter');
const total = document.querySelector('span.total');
const movieSelect = document.getElementById('movies');

// --- Functions ---

// Saves the movie info to the local storage
const saveMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};

// Get the information from local storage and converts to UI
const convertUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');

  if (selectedMovieIndex != null && selectedMoviePrice != null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
};

// Updates ticket price, number of seats and saves the information in the local storage
const updateCounter = () => {
  let ticketPrice = parseInt(movieSelect.value);
  let selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  let selectedSeatsCounter = selectedSeats.length;

  counter.innerHTML = selectedSeatsCounter;
  total.innerHTML = selectedSeatsCounter * ticketPrice;
};

convertUI();

// --- Event listener ---
container.addEventListener('click', event => {
  if (
    event.target.classList.contains('seat') &&
    !event.target.classList.contains('occupied')
  ) {
    event.target.classList.toggle('selected');
    updateCounter();
  }
});

movieSelect.addEventListener('change', event => {
  saveMovieData(event.target.selectedIndex, event.target.value);
  updateCounter();
});

// Initial function calls

convertUI();
updateCounter();
