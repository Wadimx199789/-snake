let map = document.querySelector("#map");
const mapWidth = 600;
const mapHeight = 600;
const snakeWidth = 20;
const snakeHeight = 20;
let snakeMoving;
let direction = "left";
const appleWidth = 20;
const appleHeight=20;
let snake = [];
let apple = {
    x:0,
    y:0,
}

document.addEventListener('keyup', (e) => {

    switch (e.code) {
        case 'ArrowLeft': if(direction !== "right")direction = "left";
            break;
        case "ArrowUp":if(direction !== "down") direction = "up";
            break;
        case 'ArrowRight':if(direction !== "left") direction = "right";
            break;
        case "ArrowDown":if(direction !== "up") direction = "down";
            break;
    }
})

function initApple(){
    let cordXmax = parseInt(mapWidth) - parseInt(appleWidth);
    apple['x'] = rand(0,cordXmax);
    let cordYmax = parseInt(mapHeight) - parseInt(appleHeight);
    apple['y'] = rand(0,cordYmax);
    let elem = document.createElement("img");
    elem.setAttribute("id","apple");
    elem.setAttribute("src","./assets/apple.png");
    elem.style.width = appleWidth + 'px';
    elem.style.height = appleHeight + "px";
    elem.style.top = apple["y"]+"px";
    elem.style.left = apple["x"]+"px";
    map.appendChild(elem);
    

}
function rand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
function initMap() {
    map = document.createElement("div");
    map.setAttribute('id', "map");
    map.style.width = mapWidth + "px";
    map.style.height = mapHeight + "px";
    document.body.appendChild(map);
}
function initSnake() {
    let startX = mapWidth / 2;
    let startY = mapWidth / 2;

    for (let i = 0; i < 3; i++) {
        let xPos = startX + snakeWidth * i;
        let yPos = startY;
        snake.push({
            x: xPos,
            y: yPos,
            direction: "left"
        });
        let snakeHtml = document.createElement("div");
        snakeHtml.classList.add("snake");
        if (i == 0) {
            snakeHtml.setAttribute("id", "snake-head");
        }
        snakeHtml.style.left = xPos + "px";
        snakeHtml.style.top = yPos + "px";
        map.appendChild(snakeHtml);
    }
    moveSnake();

}
function moveSnake() {
    snakeMoving = setInterval(() => {
        let prevX = snake[0]["x"];
        let prevY = snake[0]["y"];
        let prevDirection = snake[0]['direction'];

        snake[0]['direction'] = direction;
        if (direction == "left") {
            if(snake[0]['x'] <= 0){
                snake[0]["x"]=parseInt(mapWidth)-parseInt(snakeWidth);
            } else 
            snake[0]['x'] -= snakeWidth;
        }
        else if (direction == "up") {
            if(snake[0]['y'] <= 0){
                snake[0]["y"]=parseInt(mapHeight)-parseInt(snakeHeight);
            } else
            snake[0]['y'] -= snakeHeight;
        }
        if (direction == "right") {
            if((parseInt(snake[0]['x'])+parseInt(snakeWidth))>=mapWidth){
                snake[0]['x'] = 0;
            }
            else
            snake[0]['x'] += snakeWidth;
        }
        if (direction == "down") {
            if((parseInt(snake[0]['y'])+parseInt(snakeHeight))>=mapHeight){
                snake[0]['y'] = 0;
            }  else snake[0]['y'] += snakeHeight;
        }
        let elem = document.getElementsByClassName("snake")[0];
        elem.style.left = snake[0]['x'] + "px";
        elem.style.top = snake[0]['y'] + "px";
        console.log(elem);
        for (key in snake) {
            if (key > 0) {
                let xPos = prevX;
                let yPos = prevY;
                let newDirection = prevDirection;
                prevX = snake[key]["x"];
                prevY = snake[key]["y"];
                prevDirection = snake[key]["direction"];

                snake[key]["x"] = xPos;
                snake[key]["y"] = yPos;
                snake[key]["direction"]= newDirection;
                let elem = document.getElementsByClassName("snake")[key];
                elem.style.left = snake[key]['x']+"px";
                elem.style.top = snake[key]["y"]+"px";
            }
        }

    }, 100)
}

initMap();
initApple();
initSnake();