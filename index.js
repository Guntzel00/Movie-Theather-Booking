const container = document.querySelector('div.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const counter = document.querySelector('span.counter');
const total = document.querySelector('span.total');
const movieSelect = document.getElementById('movies');
let ticketPrice = parseInt(movieSelect.value);

console.log(container);

// Functions

const updateCounter = () => {
  let selectedSeats = document.querySelectorAll('.row .seat.selected');
  let selectedSeatsCounter = selectedSeats.length;
  counter.innerHTML = selectedSeatsCounter;

  total.innerHTML = selectedSeatsCounter * ticketPrice;
};

//Event listener
container.addEventListener('click', event => {
  if (
    event.target.classList.contains('seat') &&
    !event.target.classList.contains('occupied')
  ) {
    event.target.classList.toggle('selected');
    updateCounter(counter);
  }
});

movieSelect.addEventListener('change', event => {
  ticketPrice = event.target.value;
  updateCounter();
});
