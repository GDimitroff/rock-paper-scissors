const buttons = document.querySelectorAll('.btn');
buttons.forEach((button) => button.addEventListener('click', playRound));

let playerScore = 0;
let computerScore = 0;
let round = 0;

function playRound(e) {
  const playerSelection = e.target.textContent.toLowerCase();
  const computerSelection = computerPlay();

  console.log(`You chose ${playerSelection}.`);
  console.log(`Computer chose ${computerSelection}.`);

  let roundWinner = '';
  switch (true) {
    case playerSelection == 'rock' && computerSelection == 'scissors':
    case playerSelection == 'paper' && computerSelection == 'rock':
    case playerSelection == 'scissors' && computerSelection == 'paper':
      roundWinner = 'player';
      break;
    case playerSelection == 'rock' && computerSelection == 'paper':
    case playerSelection == 'paper' && computerSelection == 'scissors':
    case playerSelection == 'scissors' && computerSelection == 'rock':
      roundWinner = 'computer';
      break;
    case playerSelection == computerSelection:
      roundWinner = 'tie';
      break;
  }

  renderRoundResult(roundWinner);
}

function computerPlay() {
  const signs = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return signs[randomIndex];
}

function renderRoundResult(roundWinner) {
  if (roundWinner === 'player') {
    const score = document.querySelector('#playerScore');
    let result = Number(score.textContent);
    result += 1;
    score.textContent = result;
  } else if (roundWinner === 'computer') {
    const score = document.querySelector('#computerScore');
    let result = Number(score.textContent);
    result += 1;
    score.textContent = result;
  } else {
    console.log('TIE!');
  }
}
