'use strict';

// ==============================
// VARIABLES AND SELECTORS
// ==============================

// SELECTORS
const modalToggleBtns = document.querySelectorAll('.modal-toggle');
const modal = document.getElementById('modal');
const playerChoices = document.querySelector('.rps-btn-container');
const showPlayerMove = document.getElementById('show-player-move');
const showComputerMove = document.getElementById('show-computer-move');
const gameAccess = document.querySelector('.hide-game');
const scoreText = document.querySelectorAll('.score-container span');
const displayPlayerName = document.querySelector('.display-user');
const displayResult = document.getElementById('display-result');
const tfootScores = document.querySelectorAll('tfoot span');
const logoutBtn = document.getElementById('logout-btn');
const tbody = document.querySelector('tbody');
const audio = document.querySelectorAll('audio');

// VARIABLES
const rules = { rock: 'scissors', paper: 'rock', scissors: 'paper' };

// Conditionals
if (sessionStorage.getItem('loggedIn')) {
  gameAccess.classList.add('access-granted');
  displayPlayerName.textContent = sessionStorage.getItem('loggedIn');
}

// ==============================
// EVENT LISTENERS
// ==============================

playerChoices.addEventListener('click', async (event) => {
  if (event.target.tagName === 'I') {
    playerChoices.style.pointerEvents = 'none';
    playerChoices.style.opacity = '0.5';
    displayResult.textContent = '';
    audio[4].play();
    let playerMove = event.target.dataset.id;
    let computerMove = computerChoices();

    showPlayerMove.src = `images/${playerMove}.png`;
    await roulette();
    showComputerMove.src = `images/${computerMove}.png`;
    result(playerMove, computerMove);
  }
  // console.log(playerMove);
});

// MODAL
modalToggleBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    modalScoreBoard();
    modal.classList.toggle('modal-inactive');
  });
});

logoutBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
  sessionStorage.clear();
});

// ==============================
// FUNCTIONS
// ==============================

function computerChoices() {
  let randomNumber = Math.floor(Math.random() * 3) + 1;
  const computerChoices = { 1: 'rock', 2: 'paper', 3: 'scissors' };
  return computerChoices[randomNumber];
}

function result(playerMove, computerMove) {
  if (computerMove === playerMove) {
    timing(700);
    updateScores('draw');
    playAudio('draw');
    displayResult.textContent = 'Draw!';
  } else if (computerMove === rules[playerMove]) {
    timing(2200);
    updateScores('win');
    displayResult.textContent = 'You Win!';
    playAudio('win');
  } else {
    timing(2200);
    updateScores('lose');
    displayResult.textContent = 'You Lose!';
    playAudio('lose');
  }
}

function timing(ms) {
  setTimeout(() => {
    playerChoices.style.pointerEvents = 'auto';
    playerChoices.style.opacity = '1';
  }, ms);
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
    currentGameIndex !== -1
      ? recentGames[currentGameIndex]
      : { date, wins: 0, draws: 0, loses: 0 };

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

  user.normalRPS.recentGames = recentGames;
  users[userIndex] = user;
  localStorage.setItem('users', JSON.stringify(users));
  displayScore(currentGame);
}

function displayScore(currentGame) {
  scoreText[0].textContent = currentGame.wins;
  scoreText[1].textContent = currentGame.draws;
  scoreText[2].textContent = currentGame.loses;
}

function modalScoreBoard() {
  const users = JSON.parse(localStorage.getItem('users'));
  const user = users.find(
    (user) => user.userName === sessionStorage.getItem('loggedIn')
  );

  tfootScores[0].textContent = user.normalRPS.gamesPlayed;
  tfootScores[1].textContent = `${user.normalRPS.totalWins}/${user.normalRPS.totalDraws}/${user.normalRPS.totalLoses}`;
  tfootScores[2].textContent = user.normalRPS.totalWinPercentage;

  user.normalRPS.recentGames.forEach((game) => {
    let winPercentage =
      (game.wins / (game.wins + game.draws + game.loses)) * 100;
    let gameScore = `<tr>
                  <td>${game.date}</td>
                  <td>${game.wins}/${game.draws}/${game.loses}</td>
                  <td>${winPercentage.toFixed(2) + '%'}</td>
                </tr>`;

    if (modal.classList.contains('modal-inactive')) {
      tbody.innerHTML = '';
    }

    tbody.insertAdjacentHTML('afterbegin', gameScore);
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function roulette() {
  const rpsList = [
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    'images/rock.png',
    'images/paper.png',
    'images/scissors.png',
    'images/rock.png',
    'images/paper.png',
    'images/scissors.png',
    'images/rock.png',
    'images/paper.png',
    'images/scissors.png',
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  ];

  await delay(700);
  for (const item of rpsList) {
    await delay(500);
    showComputerMove.src = item;
    if (
      item !==
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    ) {
      playAudio('shuffle');
    }
  }
  await delay(600);
}

function playAudio(prompt) {
  if (prompt === 'shuffle') {
    audio[0].play();
  } else if (prompt === 'win') {
    audio[1].play();
  } else if (prompt === 'lose') {
    audio[2].play();
  } else if (prompt === 'draw') {
    audio[3].play();
  }
}
