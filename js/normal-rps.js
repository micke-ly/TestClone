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

function updateScores(result) {
  const users = JSON.parse(localStorage.getItem('users'));
  const user = users.find(
    (user) => user.userName === sessionStorage.getItem('loggedIn')
  );
  const userIndex = users.findIndex(
    (user) => user.userName === sessionStorage.getItem('loggedIn')
  );
  const now = new Date();
  const date = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
  const recentGames = user.normalRPS.recentGames;
  const currentGameIndex = recentGames.findIndex((game) => game.date === date);
  const currentGame =
    currentGameIndex !== -1 ? recentGames[currentGameIndex] : { date };

  user.normalRPS.gamesPlayed += 1;

  if (result === 'win') {
    user.normalRPS.totalWins += 1;
    currentGame.wins += 1;
  } else if (result === 'draw') {
    user.normalRPS.totalDraws += 1;
    currentGame.draws += 1;
  } else if (result === 'lose') {
    user.normalRPS.totalLoses += 1;
    currentGame.loses += 1;
  }
  let winPercentage =
    (user.normalRPS.totalWins / user.normalRPS.gamesPlayed) * 100;
  user.normalRPS.totalWinPercentage = winPercentage.toFixed(2) + '%';

  if (recentGames[currentGameIndex]) {
    recentGames[currentGameIndex] = currentGame;
  } else if (recentGames.length < 10) {
    recentGames.unshift(currentGame);
  } else {
    recentGames.pop();
    recentGames.unshift(currentGame);
  }

  user.recentGames = recentGames;
  users[userIndex] = user;
  localStorage.setItem('users', JSON.stringify(users));
  displayScore(user);
}

function displayScore(user) {}

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
