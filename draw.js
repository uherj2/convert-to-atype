var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d");

var enterBtn = document.getElementById("enterBtn")
var input = document.getElementById('input');

var canvasWidth = 1000;
var canvasHeight = 500;

var inlineX = 10;
var inlineY = 10;

var circleBuffer = 1;

var S = 75;
var R= S/11;
var LINEWIDTH = S/50;
ctx.lineWidth = LINEWIDTH;

let key = [
    [1,1,1,2,1,3,1,4,1,5,2,5,3,5,4,5,5,5],                      // A
    [4,2,4,4],                  // B
    [5,3],                      // C
    [5,1,5,5],                  // D
    [5,2,5,4],                  // E
    [5,3,5,5],                  // F
    [4,3,4,4,5,3],              // G
    [3,1,3,5],                  // H
    [1,3,5,3],                  // I
    [1,1],                      // J
    [2,1,2,5,5,3],              // K
    [5,1],                      // L
    [2,5,4,5],                  // M
    [2,5,4,1],                  // N
    [],                         // O
    [4,2,5,5],                  // P
    [4,5,5,4],                  // Q
    [4,2,4,5],                  // R
    [1,4,5,2],                  // S
    [1,5,5,5],                  // T
    [3,1],                      // U
    [3,1,1,5,3,1,5,5],          // V
    [2,1,4,1],                  // W
    [1,3,3,1,3,5,5,3],          // X
    [1,5,3,1],                  // Y
    [1,2,5,4],                  // Z
];

function drawSquare(x, y){
    ctx.moveTo(x,y)
    ctx.lineTo(x+S,y)
    ctx.lineTo(x+S, y+S)
    ctx.lineTo(x, y+S)
    ctx.lineTo(x,y)
    ctx.stroke();
}

function drawCircle(x,y){
    ctx.beginPath();
    ctx.arc(x,y,R,0,2* Math.PI);
    ctx.fill();
    ctx.stroke();
}

function processLetter(c, coor){
    // find ascii
    let ascii;
    if (c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90){
        ascii = c.charCodeAt(0) - 65;
    } else if (c.charCodeAt(0) >= 97 && c.charCodeAt(0) <= 122) {
        ascii = c.charCodeAt(0) - 97;
    } else {
        return;
    }

    drawSquare(coor[0], coor[1]);

    console.log(ascii);

    console.log("key length" + key[ascii].length)
    
    let xCircleCoor;
    let yCircleCoor;
    for(let i = 0; i <= key[ascii].length - 1; i+=2){
        xCircleCoor = (key[ascii][i] - 1) * ((S - (2 * (R + ctx.lineWidth + circleBuffer)))/4) + R + (coor[0]) + ctx.lineWidth + circleBuffer;
        yCircleCoor = (key[ascii][i+1] - 1) * ((S - (2 * (R + ctx.lineWidth + circleBuffer)))/4) + R + (coor[1]) + ctx.lineWidth + circleBuffer;
        drawCircle(xCircleCoor, yCircleCoor); 
    }
}

function processInput(){
    let coor = [inlineX, inlineY]

    let inputString = input.value;
    let inputLength = inputString.length;

    let xbounds = canvasWidth - S - inlineX;
    let ybounds = canvasHeight - S - inlineY;

    console.log(inputString);

    for(let i = 0; i <= inputLength - 1; i++){

        processLetter(inputString[i], coor);

        // adjust sqare coords
        if((coor[0] + S) >= xbounds || inputString[i].charCodeAt(0) == 32){ // == 32 is the ASCII for space. So it will format new line with spaces
            coor[0] = inlineX;
            if((coor[1] + S) >= ybounds){
                break;
            } else{
                coor[1] = coor[1] + S;
            }
        } else {
            coor[0] = coor[0] + S;
        }
    }
}

function clearInput(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

enterBtn.addEventListener('click', () => {
    clearInput();
    processInput();
});

