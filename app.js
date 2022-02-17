const gameBox = document.querySelector('.game-box');
const options = document.querySelector('.options');
const actions = document.querySelectorAll('.btn');
options
  .querySelectorAll('.options-btn')
  .forEach((option) => option.addEventListener('click', startGame));

function startGame(e) {
  options.classList.add('fade-out');
  gameBox.classList.add('fade-in');

  const targetPoints = e.target.textContent;
  const round = document.querySelector('.round');
  let playerScore = document.querySelector('.player-score');
  let computerScore = document.querySelector('.computer-score');
  let currentRound = 0;

  actions.forEach((action) => action.addEventListener('click', playRound));

  const playerFist = document.querySelector('.left-fist');
  const computerFist = document.querySelector('.right-fist');

  function playRound() {
    actions.forEach((action) => action.removeEventListener('click', playRound));

    if (currentRound === 0) {
      round.textContent = 1;
    } else {
      round.textContent = currentRound + 1;
    }
    
    const playerSelection = this.dataset.name;
    const computerSelection = computerPlay();

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

    playerFist.style.animation = 'shakePlayer 1s';
    computerFist.style.animation = 'shakeComputer 1s';

    setTimeout(() => {
      playerFist.style.animation = '';
      computerFist.style.animation = '';

      const result = document.querySelector('.buttons-heading');
      if (roundWinner === 'player') {
        playerScore.textContent = Number(playerScore.textContent) + 1;
        result.textContent = `You won the round! ${infoText}!`;
      } else if (roundWinner === 'computer') {
        computerScore.textContent = Number(computerScore.textContent) + 1;
        result.textContent = `You lost the round! ${infoText}!`;
      } else {
        result.textContent = "It's a tie!";
      }

      if (playerScore.textContent === targetPoints) {
        result.textContent = 'You won the game!';
        return;
      } else if (computerScore.textContent === targetPoints) {
        result.textContent = 'You lost the game!';
        return;
      }

      currentRound++;
      actions.forEach((action) => action.addEventListener('click', playRound));
    }, 1000);
  }

  function computerPlay() {
    const signs = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return signs[randomIndex];
  }
}
