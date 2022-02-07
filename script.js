function computerPlay() {
    const signs = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return signs[randomIndex];
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    console.log(`You chose ${playerSelection}.`);
    console.log(`Computer chose ${computerSelection}.`);

    switch (true) {
        case playerSelection == 'rock' && computerSelection == 'scissors':
        case playerSelection == 'paper' && computerSelection == 'rock':
        case playerSelection == 'scissors' && computerSelection == 'paper':
            return 'player';
        case playerSelection == 'rock' && computerSelection == 'paper':
        case playerSelection == 'paper' && computerSelection == 'scissors':
        case playerSelection == 'scissors' && computerSelection == 'rock':
            return 'computer';
        case playerSelection == computerSelection:
            return 'tie';
    }
}

function game() {
    let playerScore = 0;
    let computerScore = 0;
    for (let i = 0; i < 5; i++) {
        console.log(`%cROUND ${i + 1}`, 'font-weight: bold');

        const playerSelection = prompt('Type a sign: rock, paper or scissors?');

        if (
            playerSelection !== 'rock' &&
            playerSelection !== 'paper' &&
            playerSelection !== 'scissors'
        ) {
            console.log('Valid signs are: rock, paper or scissors!');
            return;
        }

        const computerSelection = computerPlay();

        const roundWinner = playRound(playerSelection, computerSelection);

        if (roundWinner === 'player') {
            playerScore++;
            console.log(
                `%cYou won the round! ${
                    playerSelection.charAt(0).toUpperCase() +
                    playerSelection.slice(1)
                } beats ${computerSelection}!`,
                'color: #29c979; font-weight: bold'
            );
        } else if (roundWinner === 'computer') {
            computerScore++;
            console.log(
                `%cYou lost the round! ${
                    computerSelection.charAt(0).toUpperCase() +
                    computerSelection.slice(1)
                } beats ${playerSelection}!`,
                'color: #ee2a2a; font-weight: bold'
            );
        } else {
            console.log(
                `%cTie, because both chose ${playerSelection}!`,
                'color: #ef8513; font-weight: bold'
            );
        }

        console.log(
            `Current result -> Player: ${playerScore} | Computer: ${computerScore}`
        );

        console.log('\n');
    }

    console.log('%cFINAL SCORE', 'font-weight: bold');
    console.log(`Player: ${playerScore} | Computer: ${computerScore}`);
    if (playerScore > computerScore) {
        console.log(
            '%cYou won! Time to celebrate!',
            'background-color: #29c979; color: #fff; font-weight: bold'
        );
    } else if (playerScore < computerScore) {
        console.log(
            '%cYou lost!',
            'background-color: #ee2a2a; color: #fff; font-weight: bold'
        );
    } else {
        console.log(
            '%cTie!',
            'background-color: #ef8513; color: #fff; font-weight: bold'
        );
    }
}

game();
