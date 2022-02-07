function computerPlay() {
    const picks = ['Rock', 'Papers', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return picks[randomIndex];
}

computerPlay();
