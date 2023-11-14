// SELECTORS
const modalToggleBtns = document.querySelectorAll('.modal-toggle');
const modal = document.getElementById('modal');
const playerChoices = document.querySelector('.rps-btn-container');
const showPlayerMove = document.getElementById('show-player-move');
const showComputerMove = document.getElementById('show-computer-move');
const gameAccess = document.querySelector('.hide-game');
const scoreText = document.querySelectorAll('.score-container span');

// VARIABLES
const rules = { rock: 'scissors', paper: 'rock', scissors: 'paper' };

// Conditionals
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

function displayScore() {}

playerChoices.addEventListener('click', (event) => {
  let playerMove = event.target.dataset.id;
  let computerMove = computerChoices();
  // console.log(computerMove);
  if (
    playerMove === 'rock' ||
    playerMove === 'paper' ||
    playerMove === 'scissors'
  ) {
    showPlayerMove.src = `images/${playerMove}.png`;
    showComputerMove.src = `images/${computerMove}.png`;
    console.log(result(playerMove, computerMove));
  }

  // console.log(playerMove);
});

// MODAL
modalToggleBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.classList.toggle('modal-inactive');
  });
});
