import _ from 'lodash';
/*
function component() {
    let element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());*/

import {
    model
} from './component.js'

var motorbike;
var line;
var enemies = [];
var myScore;

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 400;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 10);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function startGame() {
    motorbike = new model(30, 30, "black", 300, 800);
    line = new model(5, 20, "black", 200, 0);
    line.gravity = 0.05;
    motorbike.gravity = 0.05;
    myScore = new model("30px", "Consolas", "black", 0, 24, "text");
    myGameArea.start();
}
startGame()



function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (let i = 0; i < enemies.length; i += 1) {
        if (motorbike.crashWith(enemies[i])) {
            //return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        //Add enemies
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        enemies.push(new model(10, height, "red", x, 0));
        enemies.push(new model(10, x - height - gap, "green", x, height + gap));
    }
    for (let i = 0; i < enemies.length; i += 1) {
        enemies[i].x += -1;
        enemies[i].y += +1;
        enemies[i].update(myGameArea);
    }
    line.newPos(myGameArea);
    line.update(myGameArea);

    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update(myGameArea);
    motorbike.newPos(myGameArea);
    motorbike.update(myGameArea);
}

function everyinterval(n) {
    return (myGameArea.frameNo / n) % 1 == 0;
}

function accelerate(n) {
    motorbike.gravity = n;
}