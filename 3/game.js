export default class Game {
    constructor(gameArea, scoreDisplay, timeDisplay, difficultLevel, initScore = 0, initTime = 5) {
        this.gameArea = gameArea;
        this.scoreDisplay = scoreDisplay;
        this.timeDisplay = timeDisplay;
        this.difficultLevel = difficultLevel;
        this.initScore = initScore;
        this.initTime = initTime;

        this.time = this.initTime;
        this.score = this.initScore;

        this.box = null;
        this.gameInterval = null;
        this.highestScore = localStorage.getItem('highestScore') || 0;

        this.init();
    }

    init() {
        const levelButtons = this.difficultLevel.querySelectorAll('button');
        levelButtons.forEach(button => {
            button.addEventListener('click', () => {
                levelButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.resetGame();
            });
        });
    }

    getDifficultySettings() {
        const activeButton = this.difficultLevel.querySelector('.active');
        const level = activeButton ? activeButton.dataset.level : 'medium';

        this.difficultLevel.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.level === level) {
                btn.classList.add('active');
            }
        });

        switch (level) {
            case 'easy':
                return { time: 15, boxSize: 60 };
            case 'medium':
                return { time: 10, boxSize: 50 };
            case 'hard':
                return { time: 5, boxSize: 40 };
            default:
                return { time: 10, boxSize: 50 };
        }
    }

    getRandomPosition(boxSize) {
        const x = Math.floor(Math.random() * (this.gameArea.clientWidth - boxSize));
        const y = Math.floor(Math.random() * (this.gameArea.clientHeight - boxSize));
        return { x, y };
    }

    createBox() {
        if (this.box) {
            this.box.remove();
        }

        const { boxSize } = this.getDifficultySettings();

        this.box = document.createElement('div');
        this.box.classList.add('box');
        this.box.style.width = `${boxSize}px`;
        this.box.style.height = `${boxSize}px`;

        const { x, y } = this.getRandomPosition(boxSize);
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
        const { time } = this.getDifficultySettings();

        this.score = this.initScore;
        this.time = time;

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
        const { time } = this.getDifficultySettings();

        this.time = time;
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

        alert(`Game Over! Your score: ${this.score}. Highest score: ${this.highestScore}`);
    }
}
