export default class Game {
    constructor(gameArea, scoreDisplay, timeDisplay, initScore, initTime) {
        this.gameArea = gameArea;
        this.scoreDisplay = scoreDisplay;
        this.timeDisplay = timeDisplay;
        this.initScore = initScore;
        this.initTime = initTime;
        
        this.time = this.initTime;
        this.score = this.initScore;

        this.box = null;
        this.gameInterval = null;
        this.highestScore = localStorage.getItem('highestScore') || 0;
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
        this.box.classList.add('box');

        const { x, y } = this.getRandomPosition();
        this.box.style.left = `${x}px`;
        this.box.style.top = `${y}px`;

        this.gameArea.appendChild(this.box);

        this.box.addEventListener('click', this.handleBoxClick.bind(this));
    }

    handleBoxClick() {
        this.score++;
        this.scoreDisplay.textContent = this.score;
        this.createBox();
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
                this.gameOver();
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

    gameOver() {
        if (this.score > this.highestScore) {
            this.highestScore = this.score;
            localStorage.setItem('highestScore', this.highestScore);
        }

        alert(
          `Game Over! Your score: ${this.score}. Highest score: ${this.highestScore}`
        );
    }
}
