const gameBoard = document.getElementById('gameBoard');
const height = gameBoard.clientHeight/20;
const width = gameBoard.clientWidth/20;
const numberOfTiles = height * width;
const startButton = document.getElementById('startButton');
const spawnFirstFood = 1;
const foodlist = [];
const growthRate = 3;

let currentTile;
let nextTile;
let currentTileId;
let allTiles = [];
let snakeTiles = [];

//-----------  functions  -------------------------------------------------------
function CreateGameGrid(){
    for (let i=0; i<numberOfTiles; i++) {
        const tile = document.createElement('div');
        
        tile.className = "gameTileOff";
        tile.id = i;
        
        if (i/height > 0){
            tile.style.bottom = ((i%height)*20) + "px";
            tile.style.left = ((i-(i%height))/height)*20 + "px";
        }
        else {
            tile.style.bottom = "0px"
            tile.style.left = "0px"
        }
        gameBoard.append(tile); //adds each tile to the gameBoard <div>
        allTiles.push(tile); //adds each tile to the allTyles array as they're generated

        if (tile.style.bottom === "0px" || tile.style.bottom === "580px" || 
            tile.style.left === "0px" || tile.style.left === "780px"){
                CreateWall(tile);
            }
    }
}

function AddToSnake(tile){
    tile.classList.add("snakeTile");
    snakeTiles.push(tile);
}

function RemoveFromSnake(tile){
    tile.classList.remove("snakeTile");
    snakeTiles.shift(tile);
}

function MakeFoodTile(tile){
    tile.classList.add("foodTile");
}

function CreateWall (tile){ //adds "wallTile" to the given tile's class list
    tile.classList.add("wallTile");
}

function TurnTileOn(tile) { //turns the given tile "on"
    tile.className = "gameTileOn";
}

function TurnTileOff(tile) { //turns the given tile "off"
    tile.className = "gameTileOff";
}

function StartGame(){ //initiates game, turns the starting tile on and returns it
    CreateGameGrid();
    const startTile = document.getElementById(345);
    TurnTileOn(startTile);
    AddToSnake(startTile);
    return currentTile = startTile;
}

function NextTileValid(nextTile){ //checks whether or not the tile we're trying to go to is a wall tile, returns TRUE or FALSE
    return !nextTile.classList.contains("wallTile");
}

function SpawnFood(){
    let validFoodTiles = [];
    for (let i=0; i<allTiles.length; i++){
        if (allTiles[i].className.toString() === "gameTileOff"){
            validFoodTiles.push(allTiles[i]);
        }
    }
    const newFoodTile = validFoodTiles[Math.floor(Math.random()*validFoodTiles.length)];
    TurnTileOn(newFoodTile);
    MakeFoodTile(newFoodTile);
}

function IsFood(nextTile){ //checks whether or not the tile we're trying to go to is a food tile, returns TRUE or FALSE
    return nextTile.classList.contains("foodTile");
}

function EatFoodAndSpawnMore(){ //spawns more food
    SpawnFood();
}


//Event Handling
document.addEventListener("keydown", function(e){
    if (e.key === "ArrowUp"){ //ArrowUp event handling
        nextTile = document.getElementById(parseInt(currentTile.id, 10) + 1)
        if (NextTileValid(nextTile)){
            if (IsFood(nextTile)){
                EatFoodAndSpawnMore();
            }
            TurnTileOff(currentTile);
            RemoveFromSnake(currentTile);
            TurnTileOn(nextTile);
            AddToSnake(nextTile);
            return currentTile = nextTile; 
        }  
        else {
            return currentTile;
        }
    }
    if (e.key === "ArrowDown"){ //ArrowDown event handling
        nextTile = document.getElementById(parseInt(currentTile.id, 10) - 1)
        if (NextTileValid(nextTile)){
            if (IsFood(nextTile)){
                EatFoodAndSpawnMore();
            }
            TurnTileOff(currentTile);
            RemoveFromSnake(currentTile);
            TurnTileOn(nextTile);
            AddToSnake(nextTile);
            return currentTile = nextTile;
        }   
        else {
            return currentTile;
        }
    }

    if (e.key === "ArrowLeft"){ //ArrowLeft event handling
        nextTile = document.getElementById(parseInt(currentTile.id, 10) - 30)
        if (NextTileValid(nextTile)){
            if (IsFood(nextTile)){
                EatFoodAndSpawnMore();
            }
            TurnTileOff(currentTile);
            RemoveFromSnake(currentTile);
            TurnTileOn(nextTile);
            AddToSnake(nextTile);
            return currentTile = nextTile;  
        } 
        else {
            return currentTile;
        }
    }

    if (e.key === "ArrowRight"){ //ArrowRight event handling
        nextTile = document.getElementById(parseInt(currentTile.id, 10) + 30)
        if (NextTileValid(nextTile)){
            if (IsFood(nextTile)){
                EatFoodAndSpawnMore();
            }
            TurnTileOff(currentTile);
            RemoveFromSnake(currentTile);
            TurnTileOn(nextTile);
            AddToSnake(nextTile);
            return currentTile = nextTile;   
        }
        else {
            return currentTile;
        }
    }
})

startButton.addEventListener("click", function(){
    StartGame();
    SpawnFood();
});







