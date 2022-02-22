const gameBox = document.querySelector('.game-box');
const options = document.querySelector('.options');
const actions = document.querySelectorAll('.btn');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const endgameMessage = document.querySelector('.modal-heading');
const playerSign = document.querySelector('.player-sign');
const computerSign = document.querySelector('.computer-sign');
const roundResult = document.querySelector('.buttons-heading');
const round = document.querySelector('.round');
const playerScore = document.querySelector('.player-score');
const computerScore = document.querySelector('.computer-score');

let currentRound = 0;
let targetPoints = null;

options
  .querySelectorAll('.options-btn')
  .forEach((option) => option.addEventListener('click', startGame));

function startGame(e) {
  options.classList.add('fade-out');
  gameBox.classList.add('fade-in');

  targetPoints = e.target.textContent;

  actions.forEach((action) => action.addEventListener('click', handleClick));
}

function handleClick() {
  actions.forEach((action) => action.removeEventListener('click', handleClick));

  if (isGameOver(playerScore, computerScore)) {
    openEndgameModal(playerScore, computerScore);
    return;
  }

  playerSign.src = './images/rock.png';
  computerSign.src = './images/rock.png';

  if (currentRound === 0) {
    round.textContent = 1;
  } else {
    round.textContent = currentRound + 1;
  }

  playerSign.style.animation = 'shakePlayer 1s ease-in-out';
  computerSign.style.animation = 'shakeComputer 1s ease-in-out';

  setTimeout(() => {
    playerSign.style.animation = '';
    computerSign.style.animation = '';

    const playerSelection = this.dataset.name;
    const computerSelection = getRandomChoice();
    playRound(playerSelection, computerSelection);

    if (isGameOver(playerScore, computerScore)) {
      openEndgameModal(playerScore, computerScore);
      return;
    }

    currentRound++;
    actions.forEach((action) => action.addEventListener('click', handleClick));
  }, 1000);
}

function getRandomChoice() {
  const signs = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return signs[randomIndex];
}

function isGameOver(playerScore, computerScore) {
  return (
    playerScore.textContent === targetPoints ||
    computerScore.textContent === targetPoints
  );
}

function playRound(playerSelection, computerSelection) {
  let roundWinner = '';
  let infoText = '';
  switch (true) {
    case playerSelection === 'rock' && computerSelection == 'scissors':
    case playerSelection === 'paper' && computerSelection == 'rock':
    case playerSelection === 'scissors' && computerSelection == 'paper':
      roundWinner = 'player';
      infoText = `${
        playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)
      } beats ${computerSelection}`;
      break;
    case playerSelection === 'rock' && computerSelection == 'paper':
    case playerSelection === 'paper' && computerSelection == 'scissors':
    case playerSelection === 'scissors' && computerSelection == 'rock':
      roundWinner = 'computer';
      infoText = `${
        playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)
      } is beaten by ${computerSelection}`;
      break;
    case playerSelection === computerSelection:
      roundWinner = 'tie';
      break;
  }

  updateScore(roundWinner, infoText, playerSelection, computerSelection);
}

function updateScore(
  roundWinner,
  infoText,
  playerSelection,
  computerSelection
) {
  playerSign.src = `./images/${playerSelection}.png`;
  computerSign.src = `./images/${computerSelection}.png`;

  if (roundWinner === 'player') {
    playerScore.textContent = Number(playerScore.textContent) + 1;
    roundResult.innerHTML = `<span style="color: #15803d;">You won the round!</span> ${infoText}!`;
  } else if (roundWinner === 'computer') {
    computerScore.textContent = Number(computerScore.textContent) + 1;
    roundResult.innerHTML = `<span style="color: #b91c1c;">You lost the round!</span> ${infoText}!`;
  } else {
    roundResult.textContent = "It's a tie!";
  }
}

function openEndgameModal(playerScore, computerScore) {
  overlay.classList.add('active');
  modal.classList.add('active');

  if (playerScore.textContent === targetPoints) {
    endgameMessage.textContent = 'You won!';
    endgameMessage.style.backgroundColor = '#15803d';
  } else if (computerScore.textContent === targetPoints) {
    endgameMessage.textContent = 'You lost!';
    endgameMessage.style.backgroundColor = '#b91c1c';
  }

  overlay.addEventListener('click', closeEndgameModal);

  document
    .querySelectorAll('.modal-btn')
    .forEach((option) => option.addEventListener('click', restartGame));
}

function closeEndgameModal() {
  overlay.classList.remove('active');
  modal.classList.remove('active');
  overlay.removeEventListener('click', closeEndgameModal);
  actions.forEach((action) => action.addEventListener('click', handleClick));
}

function restartGame(e) {
  overlay.classList.remove('active');
  modal.classList.remove('active');
  gameBox.classList.add('fade-out');
  gameBox.classList.remove('fade-in');
  setTimeout(() => {
    gameBox.classList.remove('fade-out');
    gameBox.classList.add('fade-in');
    round.textContent = 1;
    playerScore.textContent = 0;
    computerScore.textContent = 0;
    currentRound = 0;
    targetPoints = null;
    playerSign.src = './images/rock.png';
    computerSign.src = './images/rock.png';
    roundResult.textContent = 'Choose wisely';
    startGame(e);
  }, 500);
}
