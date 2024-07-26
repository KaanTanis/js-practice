import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.querySelector('#gameArea');
    const scoreDisplay = document.querySelector('#score');
    const timeDisplay = document.querySelector('#time');
    const newGameButton = document.querySelector('#newGame');

    const initScore = 0;
    const initTime = 30;

    const game = new Game(gameArea, scoreDisplay, timeDisplay, initScore, initTime);

    newGameButton.addEventListener('click', () => {
        game.resetGame();
    });

    game.startGame();
});
