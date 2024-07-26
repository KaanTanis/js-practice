document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.querySelector('#gameArea');
    const scoreDisplay = document.querySelector('#score');
    const timeDisplay = document.querySelector('#time');
    const newGameButton = document.querySelector('#newGame');

    const initScore = 0;
    const initTime = 5;

    class Game {
        constructor(gameArea, scoreDisplay, timeDisplay, initScore, initTime) {
            this.gameArea = gameArea;
            this.scoreDisplay = scoreDisplay;
            this.timeDisplay = timeDisplay;
            this.initScore = initScore;
            this.initTime = initTime;
            this.time = initTime;
            this.score = initScore;
            this.gameInterval = null;
            this.box = null;
        }

        getRandomPosition() {
            const x = Math.floor(Math.random() * (this.gameArea.clientWidth - 50));
            const y = Math.floor(Math.random() * (this.gameArea.clientHeight - 50));
            return { x, y };
        }

        createBox() {
            if (this.box) {
                this.box.remove();
            }
            
            this.box = document.createElement('div');
            this.box.className = 'box';

            const { x, y } = this.getRandomPosition();
            this.box.style.left = `${x}px`;
            this.box.style.top = `${y}px`;

            this.gameArea.appendChild(this.box);

            this.box.addEventListener('click', () => {
                this.score++;
                this.scoreDisplay.textContent = this.score;
                this.box.remove();
                this.createBox();
            });
        }

        startGame() {
            this.score = this.initScore;
            this.time = this.initTime;
            
            this.scoreDisplay.textContent = this.score;
            this.timeDisplay.textContent = this.time;

            this.createBox();

            this.gameInterval = setInterval(() => {
                this.time--;
                this.timeDisplay.textContent = this.time;

                if (this.time === 0) {
                    clearInterval(this.gameInterval);
                    alert('Game Over');
                    if (this.box) {
                        this.box.remove();
                    }
                }
                
            }, 1000);
        }

        resetGame() {
            clearInterval(this.gameInterval);
            this.time = this.initTime;
            this.score = this.initScore;
            this.scoreDisplay.textContent = this.score;
            this.timeDisplay.textContent = this.time;

            this.startGame();
        }
    }

    const game = new Game(gameArea, scoreDisplay, timeDisplay, initScore, initTime);
    game.startGame();

    newGameButton.addEventListener('click', function() {
        game.resetGame();
    });
});
