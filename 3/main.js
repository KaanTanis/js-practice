import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.querySelector('#gameArea');
    const scoreDisplay = document.querySelector('#score');
    const timeDisplay = document.querySelector('#time');
    const newGameButton = document.querySelector('#newGame');
    const difficultLevel = document.querySelector('#difficultLevel');

    // Add event listener for difficulty level buttons
    difficultLevel.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const buttons = difficultLevel.querySelectorAll('button');
            buttons.forEach(button => button.classList.remove('active'));
            e.target.classList.add('active');
        }
    });

    const initScore = 0;

    const game = new Game(gameArea, scoreDisplay, timeDisplay, difficultLevel, initScore);

    newGameButton.addEventListener('click', () => {
        game.resetGame();
    });

    game.startGame();
});
