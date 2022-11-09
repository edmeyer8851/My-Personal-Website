const myGameBoard = document.getElementById('myGameBoard');
const height = myGameBoard.clientHeight/20;
const width = myGameBoard.clientWidth/20;
const numberOfTiles = height * width;
const startButton = document.getElementById('startButton');
const spawnFirstFood = 1;
const foodlist = [];
const growthRate = 3;

let snakeHead;
let nextTile;
let currentTileId;
let allTiles = [];
let snakeTiles = [];
let currentDirection;

//-----------  functions  -------------------------------------------------------
function CreateGameGrid(){
    for (let i=0; i<numberOfTiles; i++) {
        const tile = document.createElement('div');
        
        tile.class="";
        tile.id = i;
        
        if (i/height > 0){
            tile.style.bottom = ((i%height)*20) + "px";
            tile.style.left = ((i-(i%height))/height)*20 + "px";
        }
        else {
            tile.style.bottom = "0px"
            tile.style.left = "0px"
        }
        myGameBoard.append(tile); //adds each tile to the myGameBoard <div>
        allTiles.push(tile); //adds each tile to the allTyles array as they're generated

        if (tile.style.bottom === "0px" || tile.style.bottom === "580px" || 
            tile.style.left === "0px" || tile.style.left === "580px"){
                CreateWall(tile);
            }
    }
}

//prevents arrow keys from scrolling the page
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

function AddToSnake(tile){
    tile.classList.add("snakeTile");
    snakeTiles.push(tile);
}

function RemoveFromSnake(tile){
    tile.classList.remove("snakeTile");
    snakeTiles.shift();
}     

function GrowSnake(){
    if ((nextTile !== undefined) && IsFood(nextTile)){
        for (let i=0; i<growthRate; i++){
            switch (currentDirection){
                case "Up":
                    AddToSnake(allTiles[parseInt(nextTile.id, 10)-(i+1)]);
                    break;
                case "Down":
                    AddToSnake(allTiles[parseInt(nextTile.id, 10)+(i+1)]);
                    break;
                case "Left":
                    AddToSnake(allTiles[parseInt(nextTile.id, 10)+((i+1)*30)]);
                    break;
                case "Right": 
                    AddToSnake(allTiles[parseInt(nextTile.id, 10)-((i+1)*30)]);
                    break;
            }
        }
    }
    AddToSnake(nextTile);
    RemoveFromSnake(snakeTiles[0]);
} 

function MakeFoodTile(tile){
    tile.classList.add("foodTile");
}

function CreateWall (tile){ //adds "wallTile" to the given tile's class list
    tile.classList.add("wallTile");
}


function StartGame(){ //initiates game, turns the starting tile on and returns it
    CreateGameGrid();
    const startTile = document.getElementById(345);
    AddToSnake(startTile);
    return snakeHead = startTile;
}

function NextTileValid(nextTile){ //checks whether or not the tile we're trying to go to is a wall tile, returns TRUE or FALSE
    return !nextTile.classList.contains("wallTile");
}

function SpawnFood(){
    let validFoodTiles = [];
    for (let i=0; i<allTiles.length; i++){
        if (allTiles[i].className.toString() === ""){
            validFoodTiles.push(allTiles[i]);
        }
    }
    const newFoodTile = validFoodTiles[Math.floor(Math.random()*validFoodTiles.length)];
    MakeFoodTile(newFoodTile);
}

function ResetTile(tile){
    tile.class = "";
}

function IsFood(nextTile){ //checks whether or not the tile we're trying to go to is a food tile, returns TRUE or FALSE
    return nextTile.classList.contains("foodTile");
}

function RemoveFood(){
    nextTile.classList.remove("foodTile");
}

function EatFoodAndSpawnMore(){ //spawns more food
    GrowSnake();
    RemoveFood();
    SpawnFood();
    
    
}

function GetNextTileByDirection(e){
    switch (e.key) {
        case "w":
            currentDirection = "Up";
            return nextTile = document.getElementById(parseInt(snakeHead.id, 10) + 1);
        case "s":
            currentDirection = "Down";
            return nextTile = document.getElementById(parseInt(snakeHead.id, 10) - 1);
        case "a":
            currentDirection = "Left";
            return nextTile = document.getElementById(parseInt(snakeHead.id, 10) - 30);
        case "d":
            currentDirection = "Right";
            return nextTile = document.getElementById(parseInt(snakeHead.id, 10) + 30);
    }
}

function Move(){
    if (NextTileValid(nextTile)){
        if (IsFood(nextTile)){
            EatFoodAndSpawnMore();
        }
        else{
            AddToSnake(nextTile);
            RemoveFromSnake(snakeTiles[0]);
        }
        return snakeHead = nextTile; 
    }  
    else {
        return snakeHead;
    }
}

//Event Handling
document.addEventListener("keydown", function(e){
    nextTile = GetNextTileByDirection(e);
    if (e.key === "w" || e.key === "s" || e.key === "a" || e.key === "d"){ //ArrowUp event handling
        Move(nextTile);
    }
})

startButton.addEventListener("click", function(){
    startButton.style.display = "none";
    StartGame();
    SpawnFood();
});







