const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const box = 20; // Size of each square
let snake = [{ x: 9 * box, y: 10 * box }]; // Initial snake position
let direction = 'RIGHT'; // Initial direction
let food = { x: Math.floor(Math.random() * 19 + 1) * box, y: Math.floor(Math.random() * 19 + 1) * box }; // Initial food position
let score = 0;

// Control the snake with arrow keys
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    else if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    else if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
}

// Draw everything to the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'black' : 'green'; // Head is black, body is green
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Old position of the snake head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Which direction to move
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // If the snake eats the food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        }; // New food position
    } else {
        snake.pop(); // Remove the tail
    }

    // Add a new head
    let newHead = { x: snakeX, y: snakeY };

    // Game over conditions
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game); // Stop the game loop
        alert('Game Over! Your score: ' + score);
    }

    snake.unshift(newHead);
}

// Check for collisions with the snake itself
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Run the game loop
let game = setInterval(draw, 100);