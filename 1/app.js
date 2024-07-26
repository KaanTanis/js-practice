document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.querySelector('#gameArea');
    const scoreDisplay = document.querySelector('#score');
    const timeDisplay = document.querySelector('#time');

    const initScore = 0;
    const initTime = 5;

    let time = initTime;
    let score = initScore;
    
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
            createBox();
        });
    }

    function startGame() {
        score = initScore;
        time = initTime;
        
        scoreDisplay.textContent = score;
        timeDisplay.textContent = time;

        createBox();

        gameInterval = setInterval(function() {
            time--;
            timeDisplay.textContent = time;

            if (time === 0) {
                clearInterval(gameInterval);
                alert('Game Over');
                if (box) {
                    box.remove();
                }
            }
            
        }, 1000);
    }
    
    startGame();

    document.querySelector('#newGame').addEventListener('click', function() {
        resetGame();
    });

    function resetGame() {
        clearInterval(gameInterval);
        time = initTime;
        score = initScore;
        scoreDisplay.textContent = score;
        timeDisplay.textContent = time;

        startGame();
    }
});
