// Snake Game Configuration
const CONFIG = {
    gridSize: 20,
    tileSize: 20,
    initialSpeed: 150,
    speedIncrease: 5,
    minSpeed: 60
};

// Game State
class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.getElementById('highScore');
        this.gameStatusElement = document.getElementById('gameStatus');

        // Game state
        this.snake = [{ x: 10, y: 10 }];
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.food = this.generateFood();
        this.score = 0;
        this.highScore = this.loadHighScore();
        this.gameRunning = false;
        this.gamePaused = false;
        this.gameOver = false;
        this.speed = CONFIG.initialSpeed;
        this.lastRenderTime = 0;

        this.init();
    }

    init() {
        this.updateHighScoreDisplay();
        this.setupEventListeners();
        this.draw();
    }

    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Button controls
        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('upBtn').addEventListener('click', () => this.changeDirection({ x: 0, y: -1 }));
        document.getElementById('downBtn').addEventListener('click', () => this.changeDirection({ x: 0, y: 1 }));
        document.getElementById('leftBtn').addEventListener('click', () => this.changeDirection({ x: -1, y: 0 }));
        document.getElementById('rightBtn').addEventListener('click', () => this.changeDirection({ x: 1, y: 0 }));
    }

    handleKeyPress(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            if (!this.gameRunning) {
                this.start();
            } else {
                this.togglePause();
            }
            return;
        }

        if (e.code === 'Escape') {
            e.preventDefault();
            this.reset();
            return;
        }

        // Arrow keys
        const keyDirections = {
            'ArrowUp': { x: 0, y: -1 },
            'ArrowDown': { x: 0, y: 1 },
            'ArrowLeft': { x: -1, y: 0 },
            'ArrowRight': { x: 1, y: 0 }
        };

        if (keyDirections[e.code]) {
            e.preventDefault();
            this.changeDirection(keyDirections[e.code]);
        }
    }

    changeDirection(newDirection) {
        // Prevent reversing direction
        if (this.direction.x === -newDirection.x && this.direction.y === -newDirection.y) {
            return;
        }

        this.nextDirection = newDirection;
    }

    start() {
        if (this.gameOver) {
            this.reset();
        }

        this.gameRunning = true;
        this.gamePaused = false;
        this.updateUI();
        this.gameLoop();
    }

    togglePause() {
        if (!this.gameRunning || this.gameOver) return;

        this.gamePaused = !this.gamePaused;
        this.updateUI();

        if (!this.gamePaused) {
            this.gameLoop();
        }
    }

    reset() {
        this.snake = [{ x: 10, y: 10 }];
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.food = this.generateFood();
        this.score = 0;
        this.gameRunning = false;
        this.gamePaused = false;
        this.gameOver = false;
        this.speed = CONFIG.initialSpeed;
        this.updateScore();
        this.updateUI();
        this.draw();
    }

    gameLoop(currentTime = 0) {
        if (!this.gameRunning || this.gamePaused || this.gameOver) return;

        const timeSinceLastRender = currentTime - this.lastRenderTime;

        if (timeSinceLastRender >= this.speed) {
            this.lastRenderTime = currentTime;
            this.update();
            this.draw();
        }

        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update() {
        // Update direction
        this.direction = { ...this.nextDirection };

        // Calculate new head position
        const head = { ...this.snake[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;

        // Check wall collision
        if (head.x < 0 || head.x >= CONFIG.gridSize || head.y < 0 || head.y >= CONFIG.gridSize) {
            this.endGame();
            return;
        }

        // Check self collision
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.endGame();
            return;
        }

        // Add new head
        this.snake.unshift(head);

        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.updateScore();
            this.food = this.generateFood();

            // Increase speed
            if (this.speed > CONFIG.minSpeed) {
                this.speed = Math.max(CONFIG.minSpeed, this.speed - CONFIG.speedIncrease);
            }
        } else {
            // Remove tail if no food eaten
            this.snake.pop();
        }
    }

    generateFood() {
        let newFood;
        let foodOnSnake;

        do {
            newFood = {
                x: Math.floor(Math.random() * CONFIG.gridSize),
                y: Math.floor(Math.random() * CONFIG.gridSize)
            };

            foodOnSnake = this.snake.some(segment =>
                segment.x === newFood.x && segment.y === newFood.y
            );
        } while (foodOnSnake);

        return newFood;
    }

    draw() {
        // Clear canvas with red background
        this.ctx.fillStyle = '#4d0000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid lines (subtle red)
        this.ctx.strokeStyle = '#660000';
        this.ctx.lineWidth = 1;

        for (let i = 0; i <= CONFIG.gridSize; i++) {
            // Vertical lines
            this.ctx.beginPath();
            this.ctx.moveTo(i * CONFIG.tileSize, 0);
            this.ctx.lineTo(i * CONFIG.tileSize, this.canvas.height);
            this.ctx.stroke();

            // Horizontal lines
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * CONFIG.tileSize);
            this.ctx.lineTo(this.canvas.width, i * CONFIG.tileSize);
            this.ctx.stroke();
        }

        // Draw food (bright red with glow)
        this.ctx.fillStyle = '#ff0000';
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = '#ff0000';
        this.ctx.fillRect(
            this.food.x * CONFIG.tileSize + 2,
            this.food.y * CONFIG.tileSize + 2,
            CONFIG.tileSize - 4,
            CONFIG.tileSize - 4
        );

        // Reset shadow
        this.ctx.shadowBlur = 0;

        // Draw snake (gradient red)
        this.snake.forEach((segment, index) => {
            const isHead = index === 0;

            if (isHead) {
                // Snake head - brightest red
                this.ctx.fillStyle = '#ff3333';
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = '#ff0000';
            } else {
                // Snake body - darker red gradient
                const opacity = 1 - (index / this.snake.length) * 0.4;
                this.ctx.fillStyle = `rgba(200, 0, 0, ${opacity})`;
                this.ctx.shadowBlur = 5;
                this.ctx.shadowColor = '#8b0000';
            }

            this.ctx.fillRect(
                segment.x * CONFIG.tileSize + 1,
                segment.y * CONFIG.tileSize + 1,
                CONFIG.tileSize - 2,
                CONFIG.tileSize - 2
            );

            // Draw eyes on head
            if (isHead) {
                this.ctx.fillStyle = '#660000';
                this.ctx.shadowBlur = 0;

                const eyeSize = 3;
                const eyeOffsetX = 6;
                const eyeOffsetY = 6;

                // Left eye
                this.ctx.fillRect(
                    segment.x * CONFIG.tileSize + eyeOffsetX,
                    segment.y * CONFIG.tileSize + eyeOffsetY,
                    eyeSize,
                    eyeSize
                );

                // Right eye
                this.ctx.fillRect(
                    segment.x * CONFIG.tileSize + CONFIG.tileSize - eyeOffsetX - eyeSize,
                    segment.y * CONFIG.tileSize + eyeOffsetY,
                    eyeSize,
                    eyeSize
                );
            }
        });

        // Reset shadow
        this.ctx.shadowBlur = 0;
    }

    updateScore() {
        this.scoreElement.textContent = this.score;

        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveHighScore();
            this.updateHighScoreDisplay();
            this.highScoreElement.classList.add('high-score-beat');
            setTimeout(() => {
                this.highScoreElement.classList.remove('high-score-beat');
            }, 500);
        }
    }

    updateHighScoreDisplay() {
        this.highScoreElement.textContent = this.highScore;
    }

    updateUI() {
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');

        if (this.gameOver) {
            this.gameStatusElement.textContent = 'GAME OVER! Press SPACE to restart';
            this.gameStatusElement.classList.add('game-over');
            startBtn.style.display = 'inline-block';
            startBtn.textContent = 'RESTART';
            pauseBtn.style.display = 'none';
        } else if (this.gamePaused) {
            this.gameStatusElement.textContent = 'PAUSED - Press SPACE to continue';
            this.gameStatusElement.classList.remove('game-over');
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'inline-block';
            pauseBtn.textContent = 'RESUME';
        } else if (this.gameRunning) {
            this.gameStatusElement.textContent = 'Playing... Use Arrow Keys to move!';
            this.gameStatusElement.classList.remove('game-over');
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'inline-block';
            pauseBtn.textContent = 'PAUSE';
        } else {
            this.gameStatusElement.textContent = 'Press SPACE or click START to begin';
            this.gameStatusElement.classList.remove('game-over');
            startBtn.style.display = 'inline-block';
            startBtn.textContent = 'START';
            pauseBtn.style.display = 'none';
        }
    }

    endGame() {
        this.gameRunning = false;
        this.gameOver = true;
        this.updateUI();
        this.draw();
    }

    loadHighScore() {
        const saved = localStorage.getItem('redSnakeHighScore');
        return saved ? parseInt(saved) : 0;
    }

    saveHighScore() {
        localStorage.setItem('redSnakeHighScore', this.highScore.toString());
    }
}

// Initialize game when page loads
let game;
window.addEventListener('DOMContentLoaded', () => {
    game = new SnakeGame();
});

// Prevent scrolling with arrow keys
window.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
    }
});
