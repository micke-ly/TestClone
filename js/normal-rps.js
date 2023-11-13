// SELECTORS
const modalToggleBtns = document.querySelectorAll('.modal-toggle');
const modal = document.getElementById('modal');
const playerChoices = document.querySelector('.rps-btn-container');
const showPlayerMove = document.getElementById('show-player-move');

// VARIABLES
let playerMove;
let computerMove;

playerChoices.addEventListener('click', (event) => {
  playerMove = event.target.dataset.id;
  showPlayerMove.src = `images/${playerMove}.png`;
  console.log(playerMove);
});

// MODAL
modalToggleBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.classList.toggle('modal-inactive');
  });
});
