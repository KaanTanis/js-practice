document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.querySelector('#gameArea');
    const scoreDisplay = document.querySelector('#score');
    const timeDisplay = document.querySelector('#time');

    let score = 0;
    let time = 30;
    let gameInterval = null;
    let box = null;

    function getRandomPosition() {
        const x = Math.floor(Math.random() * (gameArea.clientWidth - 50));
        const y = Math.floor(Math.random() * (gameArea.clientHeight - 50));
        return { x, y };
    }

    function createBox() {
        if (box) {
            box.remove();
        }
        
        box = document.createElement('div');
        box.className = 'box';

        const { x, y } = getRandomPosition();
        box.style.left = `${x}px`;
        box.style.top = `${y}px`;

        gameArea.appendChild(box);

        box.addEventListener('click', function() {
            score++;
            scoreDisplay.textContent = score;
            box.remove();
        })
    }

    function startGame() {
        score = 0;
        time = 30;
        
        scoreDisplay.textContent = score;
        timeDisplay.textContent = time;

        createBox();

        gameInterval = setInterval(function() {
            time--;
            timeDisplay.textContent = time;

            if (time === 0) {
                clearInterval(gameInterval);
                alert('Game Over');
                box.remove();
            }

            createBox();
        }, 1000);
    }
    
    startGame();
});