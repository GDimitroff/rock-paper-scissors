const gameBox = document.querySelector('.game-box');
const options = document.querySelector('.options');
const actions = document.querySelectorAll('.btn');
options
  .querySelectorAll('.options-btn')
  .forEach((option) => option.addEventListener('click', startGame));

function startGame(e) {
  options.classList.add('fade-out');
  gameBox.classList.add('fade-in');

  const bestOf = e.target.textContent;
  let playerScore = document.querySelector('.player-score');
  let computerScore = document.querySelector('.computer-score');
  let currentRound = document.querySelector('.round');

  actions.forEach((action) => action.addEventListener('click', playRound));

  function playRound() {
    actions.forEach((action) => action.removeEventListener('click', playRound));
    const playerSelection = this.dataset.name;
    const computerSelection = computerPlay();
    const result = document.querySelector('.buttons-heading');

    console.log(`You chose ${playerSelection}.`);
    console.log(`Computer chose ${computerSelection}.`);

    let roundWinner = '';
    switch (true) {
      case playerSelection === 'rock' && computerSelection == 'scissors':
      case playerSelection === 'paper' && computerSelection == 'rock':
      case playerSelection === 'scissors' && computerSelection == 'paper':
        roundWinner = 'player';
        break;
      case playerSelection === 'rock' && computerSelection == 'paper':
      case playerSelection === 'paper' && computerSelection == 'scissors':
      case playerSelection === 'scissors' && computerSelection == 'rock':
        roundWinner = 'computer';
        break;
      case playerSelection === computerSelection:
        roundWinner = 'tie';
        break;
    }

    if (roundWinner === 'player') {
      playerScore.textContent = Number(playerScore.textContent) + 1;
      result.textContent = 'You win!';
    } else if (roundWinner === 'computer') {
      computerScore.textContent = Number(computerScore.textContent) + 1;
      result.textContent = 'You loose!';
    } else {
      result.textContent = "It's a tie!";
    }

    if (playerScore.textContent === bestOf) {
      result.textContent = 'You won!';
      return;
    } else if (computerScore.textContent === bestOf) {
      result.textContent = 'You lost!';
      return;
    }

    currentRound.textContent = Number(currentRound.textContent) + 1;
    actions.forEach((action) => action.addEventListener('click', playRound));
  }

  function computerPlay() {
    const signs = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return signs[randomIndex];
  }
}
