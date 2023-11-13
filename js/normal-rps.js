// SELECTORS
const modalToggleBtns = document.querySelectorAll('.modal-toggle');
const modal = document.getElementById('modal');
const playerChoices = document.querySelector('.rps-btn-container');
const showPlayerMove = document.getElementById('show-player-move');
const showComputerMove = document.getElementById('show-computer-move');
const gameAccess = document.querySelector('.hide-game');

// VARIABLES
const rules = { rock: 'scissors', paper: 'rock', scissors: 'paper' };

if (sessionStorage.getItem('loggedIn')) {
  gameAccess.classList.add('access-granted');
}
// FUNCTIONS
function computerChoices() {
  let randomNumber = Math.floor(Math.random() * 3) + 1;
  const computerChoices = { 1: 'rock', 2: 'paper', 3: 'scissors' };
  return computerChoices[randomNumber];
}

function result(playerMove, computerMove) {
  if (computerMove === playerMove) {
    return 'draw';
  }
  if (computerMove === rules[playerMove]) {
    return 'win';
  } else {
    return 'lose';
  }
}

playerChoices.addEventListener('click', (event) => {
  let playerMove = event.target.dataset.id;
  let computerMove = computerChoices();
  // console.log(computerMove);
  showPlayerMove.src = `images/${playerMove}.png`;
  showComputerMove.src = `images/${computerMove}.png`;

  // console.log(playerMove);
  console.log(result(playerMove, computerMove));
});

// MODAL
modalToggleBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.classList.toggle('modal-inactive');
  });
});
