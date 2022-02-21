const gameBox = document.querySelector('.game-box');
const options = document.querySelector('.options');
const actions = document.querySelectorAll('.btn');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const endgameMessage = document.querySelector('.modal-heading');
const playerFist = document.querySelector('.left-fist');
const computerFist = document.querySelector('.right-fist');
const result = document.querySelector('.buttons-heading');

options
  .querySelectorAll('.options-btn')
  .forEach((option) => option.addEventListener('click', startGame));

function startGame(e) {
  options.classList.add('fade-out');
  gameBox.classList.add('fade-in');

  playerFist.src = './images/rock.png';
  computerFist.src = './images/rock.png';

  const targetPoints = e.target.textContent;
  const round = document.querySelector('.round');
  let playerScore = document.querySelector('.player-score');
  let computerScore = document.querySelector('.computer-score');

  round.textContent = 1;
  playerScore.textContent = 0;
  computerScore.textContent = 0;
  let currentRound = 0;
  result.textContent = 'Choose wisely';

  actions.forEach((action) => action.addEventListener('click', playRound));

  function playRound() {
    playerFist.src = './images/rock.png';
    computerFist.src = './images/rock.png';

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

    playerFist.style.animation = 'shakePlayer 1s ease-in-out';
    computerFist.style.animation = 'shakeComputer 1s ease-in-out';

    setTimeout(() => {
      playerFist.style.animation = '';
      computerFist.style.animation = '';

      playerFist.src = `./images/${playerSelection}.png`;
      computerFist.src = `./images/${computerSelection}.png`;

      const result = document.querySelector('.buttons-heading');
      if (roundWinner === 'player') {
        playerScore.textContent = Number(playerScore.textContent) + 1;
        result.innerHTML = `<span style="color: #15803d;">You won the round!</span> ${infoText}!`;
      } else if (roundWinner === 'computer') {
        computerScore.textContent = Number(computerScore.textContent) + 1;
        result.innerHTML = `<span style="color: #b91c1c;">You lost the round!</span> ${infoText}!`;
      } else {
        result.textContent = "It's a tie!";
      }

      if (
        playerScore.textContent === targetPoints ||
        computerScore.textContent === targetPoints
      ) {
        overlay.classList.add('active');
        modal.classList.add('active');

        if (playerScore.textContent === targetPoints) {
          endgameMessage.textContent = 'You won!';
          endgameMessage.style.backgroundColor = '#15803d';
        } else if (computerScore.textContent === targetPoints) {
          endgameMessage.textContent = 'You lost!';
          endgameMessage.style.backgroundColor = '#b91c1c';
        }

        document
          .querySelectorAll('.options-btn')
          .forEach((option) =>
            option.addEventListener('click', prepareGameField)
          );

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

function prepareGameField(e) {
  overlay.classList.remove('active');
  modal.classList.remove('active');
  gameBox.classList.add('fade-out');
  gameBox.classList.remove('fade-in');
  setTimeout(() => {
    gameBox.classList.remove('fade-out');
    gameBox.classList.add('fade-in');
    startGame(e);
  }, 500);
}
