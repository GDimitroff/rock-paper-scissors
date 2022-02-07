function computerPlay() {
    const signs = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return signs[randomIndex];
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    console.log('--> Player: ' + playerSelection);
    console.log('--> Computer: ' + computerSelection);

    if (
        playerSelection !== 'rock' &&
        playerSelection !== 'paper' &&
        playerSelection !== 'scissors'
    ) {
        return 'Valid signs are: rock, paper or scissors!';
    }

    switch (true) {
        case playerSelection == 'rock' && computerSelection == 'scissors':
        case playerSelection == 'paper' && computerSelection == 'rock':
        case playerSelection == 'scissors' && computerSelection == 'paper':
            return `You won! ${playerSelection} beats ${computerSelection}!`;
        case playerSelection == 'rock' && computerSelection == 'paper':
        case playerSelection == 'paper' && computerSelection == 'scissors':
        case playerSelection == 'scissors' && computerSelection == 'rock':
            return `You lost! ${computerSelection} beats ${playerSelection}!`;
        case playerSelection == computerSelection:
            return `Tie, because both chose ${playerSelection}!`;
    }
}

const playerSelection = 'scissors';
const computerSelection = computerPlay();
console.log('*** ' + playRound(playerSelection, computerSelection) + ' ***');
