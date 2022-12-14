const GRID_SIZE = 21;
const EXPANSION_RATE = 3;
const gameBoard = document.getElementById('game-board');
const scoreBoard = document.getElementById('stats');
const SNAKE_SPEED = 10;
const snakeBody = [{x: 11, y: 11}];
let food = getRandomFoodPosition();
let score = 0;
let lastRenderTime = 0;
let gameOver = false;
let inputDirection = { x:0, y: 0 };
let lastInputDirection = { x:0, y:0 };
let newSegments = 0;


function main(currentTime){
    if (gameOver){
        if (confirm('You lost! Press ok to restart.')){
            location.reload();
        }
        return
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
    
    lastRenderTime = currentTime;

    update();
    draw();
}

function update(){
    updateSnake();
    updateFood();
    checkDeath();
}

function draw(){ 
    gameBoard.innerHTML = ''; 
    scoreBoard.innerHTML = 'Points: ' + score.toString(); 
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function updateFood(){
    if (onSnake(food)){
        expandSnake(EXPANSION_RATE);
        score += 10;
        food = getRandomFoodPosition();

    }
}

function drawFood(gameBoard){
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition(){
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}

function randomGridPosition(){
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}

function outsideGrid(position){
    return (
        position.x < 1 || position.x > GRID_SIZE ||
        position.y < 1 || position.y > GRID_SIZE
    )
}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: -1 }
            break;
        case 'ArrowDown':
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: 1 }
            break;
        case 'ArrowLeft':
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: -1, y: 0 }
            break;
        case 'ArrowRight':
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: 1, y: 0 }
            break;
    }
})

function getInputDirection(){
    lastInputDirection = inputDirection;
    return inputDirection;
}

function updateSnake(){
    addSegments();
    
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length-2; i>=0; i--){
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

function drawSnake(gameBoard){
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    })
}

function expandSnake(amount){
    newSegments += amount;
}

function onSnake(position, { ignoreHead = false} = {}){
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false;
        return equalPositions(segment, position)
    })
}

function equalPositions (pos1, pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments(){
    for(let i = 0; i < newSegments; i++){
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
    }

    newSegments = 0;
}

function snakeIntersection(){
    return onSnake(snakeBody[0], { ignoreHead: true})
}

function getSnakeHead(){
    return snakeBody[0];
}

window.requestAnimationFrame(main);